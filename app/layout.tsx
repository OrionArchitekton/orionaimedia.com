import '../styles/globals.css';
import { Cinzel, Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { organizationSchema } from '@/lib/schema';

const cinzel = Cinzel({ subsets: ['latin'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
    themeColor: '#0E141B',
    colorScheme: 'dark'
};

export const metadata: Metadata = {
    metadataBase: new URL('https://www.orionaimedia.com'),
    title: {
        default: 'Orion Ascend Media — Acquire. Improve. Recycle.',
        template: '%s — Orion Ascend Media'
    },
    description:
        'Orion Ascend Media is a governed digital-asset acquisition and growth arm within the Orion Apex Capital ecosystem.',
    alternates: { canonical: 'https://www.orionaimedia.com' },
    openGraph: {
        type: 'website',
        siteName: 'Orion Ascend Media',
        title: 'Orion Ascend Media',
        description: 'Acquire. Improve. Recycle.',
        url: 'https://www.orionaimedia.com',
        images: [
            {
                url: '/og.png',
                width: 1200,
                height: 630,
                alt: 'Orion Ascend Media — Acquire • Improve • Recycle'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Orion Ascend Media',
        description: 'Acquire. Improve. Recycle.',
        images: ['/og.png']
    },
    icons: {
        icon: [
            { url: '/crest.svg', type: 'image/svg+xml' },
            { url: '/og.png', type: 'image/png', sizes: '1200x630' }
        ],
        apple: [
            { url: '/crest-transparent-1024.png', sizes: '1024x1024', type: 'image/png' }
        ]
    },
    manifest: '/site.webmanifest'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            url: 'https://www.orionaimedia.com',
                            name: 'Orion Ascend Media'
                        })
                    }}
                />
                {gaId ? (
                    <>
                        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
                        <Script id="ga-init" strategy="afterInteractive">{`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);} 
                            gtag('js', new Date());
                            gtag('config', '${gaId}', { send_page_view: false });
                        `}</Script>
                    </>
                ) : null}
                {plausibleDomain ? (
                    <Script
                        src="https://plausible.io/js/script.js"
                        strategy="afterInteractive"
                        data-domain={plausibleDomain}
                        defer
                    />
                ) : null}
                {/* client tracking utility is in lib/track.ts */}
            </head>
            <body className={`body-bg ${cinzel.className} ${inter.className}`}>
                <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] bg-graphite-800 text-metal-text border border-royal-shade/40 rounded px-3 py-2">Skip to content</a>
                <div className="fixed inset-0 -z-wave wave-layer opacity-50" />
                <div className="relative min-h-screen" id="content">{children}</div>
                <div className="md:hidden fixed bottom-3 left-0 right-0 z-[60] flex justify-center pointer-events-none">
                    <a
                        href="/contact#book"
                        className="pointer-events-auto rounded-button bg-gold-g2/10 border border-gold-g1/40 shadow-gold-emboss px-5 py-3 text-sm font-semibold text-gold-g0 hover:bg-graphite-800"
                    >
                        Book a call
                    </a>
                </div>
            </body>
        </html>
    );
}

