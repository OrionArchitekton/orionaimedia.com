import Image from 'next/image';
import type { Channel } from '@/lib/channels';
import type { SelectedRelease } from '@/lib/latest-release';

type Props = { channel: Channel; release: SelectedRelease };

export default function ChannelCard({ channel, release }: Props) {
    const watchUrl = `https://www.youtube.com/watch?v=${release.videoId}`;
    return (
        <article className="portal overflow-hidden rounded-b-xl rounded-t-[72px] border border-gold/40 pt-6">
            <a href={watchUrl} className="block" aria-label={`Watch ${release.title}`}>
                <Image
                    src={`https://i.ytimg.com/vi/${release.videoId}/hqdefault.jpg`}
                    alt=""
                    width={480}
                    height={270}
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="aspect-video w-full object-cover"
                    priority
                />
            </a>
            <div className="p-4">
                <h2 className="font-serif text-2xl font-semibold text-gold-light">
                    <a href={channel.homeUrl} className="hover:text-cream">
                        {channel.name}
                    </a>
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-cream/80">{channel.description}</p>
                {channel.links.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-cream/70">
                        {channel.links.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} className="hover:text-gold-light">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="mt-3 border-t border-gold/20 pt-2 text-xs text-gold">
                    Latest ·{' '}
                    <a href={watchUrl} className="hover:text-gold-light">
                        {release.title}
                    </a>
                </p>
            </div>
        </article>
    );
}
