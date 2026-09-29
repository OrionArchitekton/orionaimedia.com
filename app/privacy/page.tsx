import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';

// The legal owner behind the brand, as supplied by the site owner.
const SITE_OWNER = 'Orion Apex Capital LLC';

export const metadata: Metadata = {
    title: 'Privacy',
    description: 'What orionaimedia.com collects: nothing beyond standard hosting logs.',
    alternates: { canonical: 'https://www.orionaimedia.com/privacy' },
    // A page-level openGraph replaces the layout's entirely, so it repeats the share image.
    openGraph: {
        type: 'website',
        siteName: 'Orion Ascend Media',
        title: 'Privacy | Orion Ascend Media',
        url: 'https://www.orionaimedia.com/privacy',
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Orion Ascend Media' }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy | Orion Ascend Media',
        description: 'What orionaimedia.com collects: nothing beyond standard hosting logs.',
        images: ['/og.png']
    }
};

export default function PrivacyPage() {
    return (
        <main className="sky min-h-screen px-4 pb-10 pt-12 sm:px-8">
            <article className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-cream/85">
                <p>
                    <Link href="/" className="text-gold hover:text-gold-light">
                        Orion Ascend Media
                    </Link>
                </p>
                <h1 className="font-serif text-4xl font-semibold text-gold-light">Privacy</h1>
                <p>{`Orion Ascend Media is a brand of ${SITE_OWNER}.`}</p>
                <p>
                    This site collects nothing beyond standard hosting logs, kept by our hosting provider for
                    security and operations.
                </p>
                <p>It sets no tracking cookies, runs no analytics and has no forms.</p>
                <p>
                    Thumbnails of our latest videos are served from this site&apos;s own domain, so visiting it does
                    not contact YouTube.
                </p>
                <p>
                    Each of our properties has its own policy for anything it collects, for example the{' '}
                    <a href="https://orionawakens.com/privacy" className="text-gold hover:text-gold-light">
                        Orion Awakens privacy policy
                    </a>
                    .
                </p>
                <p>
                    Questions:{' '}
                    <a href="mailto:hello@orionaimedia.com" className="text-gold hover:text-gold-light">
                        hello@orionaimedia.com
                    </a>
                </p>
            </article>
            <SiteFooter />
        </main>
    );
}
