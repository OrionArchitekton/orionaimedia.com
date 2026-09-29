// JSON-LD for the organization, rendered in the root layout.
import { CHANNELS } from '@/lib/channels';

export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Orion Ascend Media',
        url: 'https://www.orionaimedia.com',
        logo: 'https://www.orionaimedia.com/crest.svg',
        description: 'A small house of original channels for stillness, sound and wonder.',
        email: 'hello@orionaimedia.com',
        sameAs: CHANNELS.map((channel) => channel.homeUrl)
    };
}
