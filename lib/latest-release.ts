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
const ISO_TIMESTAMP = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
const NAMED_ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

// A real calendar timestamp. Date.parse alone rolls impossible days forward (Feb 30 becomes Mar 2).
function isRealTimestamp(value: string): boolean {
    const parts = value.match(ISO_TIMESTAMP);
    if (!parts) return false;
    const [year, month, day, hour, minute, second] = parts.slice(1, 7).map(Number);
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth
        && hour < 24 && minute < 60 && second < 60 && !Number.isNaN(Date.parse(value));
}

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

// The envelope every real feed has: an optional XML declaration, an Atom <feed> root, its
// closing tag at the very end, and every <entry> closed. Anything else is unreadable.
// This is pattern matching for YouTube's Atom format, not a general XML validator (see the
// spec's constraints for the accepted limit).
const FEED_ENVELOPE = /^\s*(<\?xml[^>]*\?>\s*)?<feed[\s>][\s\S]*<\/feed>\s*$/;

function isWellFormedFeed(feedXml: string): boolean {
    if (!FEED_ENVELOPE.test(feedXml)) return false;
    return feedXml.split('<entry>').length === feedXml.split('</entry>').length;
}

// Full-length videos only, newest first. Shorts are recognised by their /shorts/ link.
export function parseFullLengthReleases(feedXml: string): Release[] {
    // A truncated or non-feed response is treated as unreadable, never partially trusted.
    if (!isWellFormedFeed(feedXml)) return [];
    const releases: Release[] = [];
    // Split rather than run one regex over the whole document, so a flood of unclosed <entry>
    // tags stays linear; an entry without its closing tag is ignored.
    for (const chunk of feedXml.split('<entry>').slice(1)) {
        const end = chunk.indexOf('</entry>');
        if (end < 0) continue;
        const entry = chunk.slice(0, end);
        const videoId = field(entry, /<yt:videoId>([^<]*)<\/yt:videoId>/);
        const title = field(entry, /<title>([^<]*)<\/title>/);
        const link = field(entry, /<link rel="alternate" href="([^"]*)"/);
        const published = field(entry, /<published>([^<]*)<\/published>/);
        if (!videoId || !VIDEO_ID.test(videoId)) continue;
        if (!title || !published || !isRealTimestamp(published)) continue;
        if (link !== `https://www.youtube.com/watch?v=${videoId}`) continue;
        releases.push({ videoId, title: decodeXmlText(title), published });
    }
    return releases.sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
}

export function selectLatestRelease(feedXml: string | null, lastKnown: Release): SelectedRelease {
    const newest = feedXml ? parseFullLengthReleases(feedXml)[0] : undefined;
    return newest ? { ...newest, source: 'feed' } : { ...lastKnown, source: 'last-known' };
}
