// Chooses what a channel card shows: the newest full-length video on the channel's public
// YouTube feed, or the channel's last-known release when the feed cannot supply one.
// Pure and import-free so the unit tests can load it directly.

export type Release = {
    videoId: string;
    title: string;
    published: string; // ISO 8601, as the feed states it
};

export type SelectedRelease = Release & { source: 'feed' | 'last-known' };

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const NAMED_ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

function codePoint(value: number, original: string): string {
    return Number.isInteger(value) && value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : original;
}

export function decodeXmlText(text: string): string {
    return text.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-z]+);/g, (original, code: string) => {
        if (code.startsWith('#x')) return codePoint(parseInt(code.slice(2), 16), original);
        if (code.startsWith('#')) return codePoint(parseInt(code.slice(1), 10), original);
        return NAMED_ENTITIES[code] ?? original;
    });
}

function field(entry: string, pattern: RegExp): string | null {
    const match = entry.match(pattern);
    return match ? match[1].trim() : null;
}

// Full-length videos only, newest first. Shorts are recognised by their /shorts/ link.
export function parseFullLengthReleases(feedXml: string): Release[] {
    const releases: Release[] = [];
    for (const [, entry] of feedXml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
        const videoId = field(entry, /<yt:videoId>([^<]*)<\/yt:videoId>/);
        const title = field(entry, /<title>([^<]*)<\/title>/);
        const link = field(entry, /<link rel="alternate" href="([^"]*)"/);
        const published = field(entry, /<published>([^<]*)<\/published>/);
        if (!videoId || !VIDEO_ID.test(videoId)) continue;
        if (!title || !published || Number.isNaN(Date.parse(published))) continue;
        if (link !== `https://www.youtube.com/watch?v=${videoId}`) continue;
        releases.push({ videoId, title: decodeXmlText(title), published });
    }
    return releases.sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
}

export function selectLatestRelease(feedXml: string | null, lastKnown: Release): SelectedRelease {
    const newest = feedXml ? parseFullLengthReleases(feedXml)[0] : undefined;
    return newest ? { ...newest, source: 'feed' } : { ...lastKnown, source: 'last-known' };
}
