// Reads a channel's public YouTube feed on the server. Never throws: any failure returns null,
// and the caller shows the channel's last-known release instead.

const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=';
const FEED_TIMEOUT_MS = 5000;
const MAX_FEED_CHARS = 2_000_000; // real feeds are about 40 KB; anything this large is not a feed

// Six hours. app/page.tsx repeats this literal in `export const revalidate` (Next requires a literal there).
export const FEED_REVALIDATE_SECONDS = 21600;

export async function fetchFeed(channelId: string): Promise<string | null> {
    try {
        const response = await fetch(`${FEED_URL}${encodeURIComponent(channelId)}`, {
            next: { revalidate: FEED_REVALIDATE_SECONDS },
            signal: AbortSignal.timeout(FEED_TIMEOUT_MS)
        });
        if (!response.ok) return null;
        const text = await response.text();
        return text.length <= MAX_FEED_CHARS ? text : null;
    } catch {
        return null;
    }
}
