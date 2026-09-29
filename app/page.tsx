import type { Metadata } from 'next';
import ChannelCard from '@/components/ChannelCard';
import SiteFooter from '@/components/SiteFooter';
import { CHANNELS, IN_DEVELOPMENT } from '@/lib/channels';
import { fetchFeed } from '@/lib/fetch-feed';
import { selectLatestRelease } from '@/lib/latest-release';

// Six hours, equal to FEED_REVALIDATE_SECONDS in lib/fetch-feed.ts. Next requires a literal here.
export const revalidate = 21600;

// No title here: the layout's default ("Orion Ascend Media") applies. A page title would be
// run through the layout's template and read "Orion Ascend Media | Orion Ascend Media".
export const metadata: Metadata = {
    description: 'A small house of original channels for stillness, sound and wonder.',
    alternates: { canonical: 'https://www.orionaimedia.com' }
};

export default async function FrontDoor() {
    const releases = await Promise.all(
        CHANNELS.map(async (channel) => selectLatestRelease(await fetchFeed(channel.youtubeChannelId), channel.lastKnown))
    );

    return (
        <main className="sky min-h-screen px-4 pb-10 pt-12 sm:px-8">
            <header className="mx-auto max-w-3xl text-center">
                <img src="/crest.svg" alt="" width={64} height={64} className="mx-auto mb-4" />
                <h1 className="wordmark font-serif text-4xl font-semibold uppercase tracking-[0.14em] sm:text-5xl">
                    Orion Ascend Media
                </h1>
                <p className="mt-2 text-xs uppercase tracking-[0.38em] text-gold">Imagine · Create · Transcend</p>
                <p className="mt-5 font-serif text-xl italic sm:text-2xl">
                    A small house of original channels for stillness, sound and wonder.
                </p>
            </header>

            <section aria-label="Channels" className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
                {CHANNELS.map((channel, index) => (
                    <ChannelCard key={channel.slug} channel={channel} release={releases[index]} />
                ))}
            </section>

            <section
                aria-label="In development"
                className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.12em] text-cream/70"
            >
                <span>In development</span>
                {IN_DEVELOPMENT.map((project) =>
                    project.href ? (
                        <a key={project.name} href={project.href} className="pill hover:text-gold-light">
                            {project.name}
                        </a>
                    ) : (
                        <span key={project.name} className="pill">
                            {project.name}
                        </span>
                    )
                )}
            </section>

            <SiteFooter />
        </main>
    );
}
