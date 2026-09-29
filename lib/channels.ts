import type { Release } from './latest-release';

export type ChannelLink = { label: string; href: string };

export type Channel = {
    slug: 'orion-awakens' | 'orion-frequency' | 'elsewhere-unfolds';
    name: string;
    description: string;
    homeUrl: string; // where the card title links
    youtubeChannelId: string;
    links: ChannelLink[];
    lastKnown: Release; // shown when the feed cannot supply a latest release
};

export const CHANNELS: Channel[] = [
    {
        slug: 'orion-awakens',
        name: 'Orion Awakens',
        description: 'Guided meditations and reflective essays.',
        homeUrl: 'https://orionawakens.com',
        youtubeChannelId: 'UCEilXSCiU32tPJKcizILoZg',
        links: [
            { label: 'Shop', href: 'https://orionawakens.com/shop' },
            { label: 'Printables', href: 'https://orionawakens.com/printables' },
            { label: 'Newsletter', href: 'https://orionawakens.com/newsletter' },
            { label: 'Abundance 919', href: 'https://abundance919.orionawakens.com' }
        ],
        lastKnown: {
            videoId: 'gJUe5KmLhJc',
            title: 'Guided Inner Child Meditation | The Room Before Choice',
            published: '2026-09-28T16:00:12+00:00'
        }
    },
    {
        slug: 'orion-frequency',
        name: 'Orion Frequency',
        description: 'Original 432 Hz music for meditation and rest.',
        homeUrl: 'https://www.youtube.com/@OrionFrequency',
        youtubeChannelId: 'UC66wMaUpCGT7URMEJzlRBgg',
        links: [],
        lastKnown: {
            videoId: '2Z_U8bPPRQc',
            title: 'Deep Rest Music | 432 Hz Night Air (30 Minutes)',
            published: '2026-09-29T00:00:13+00:00'
        }
    },
    {
        slug: 'elsewhere-unfolds',
        name: 'Elsewhere Unfolds',
        description: 'Cinematic journeys through invented worlds, with original ambient music.',
        homeUrl: 'https://www.youtube.com/@ElsewhereUnfolds',
        youtubeChannelId: 'UC9A9timn4bLmWOu8vH1fx-w',
        links: [],
        lastKnown: {
            videoId: 'rqLE-al-BPE',
            title: 'The Night Ferry Through the Rings | Cinematic AI Art & Ambient Music',
            published: '2026-09-29T00:00:24+00:00'
        }
    }
];

export type InDevelopmentProject = { name: string; href?: string };

export const IN_DEVELOPMENT: InDevelopmentProject[] = [
    { name: 'Talking Plants' },
    { name: 'Yin vs Yang', href: 'https://www.tiktok.com/@theyinyang.house' }
];
