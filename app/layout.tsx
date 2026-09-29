import '../styles/globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { organizationSchema } from '@/lib/schema';

// next/font downloads these at build time and serves them from this site; visitors never contact Google.
const serif = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['500', '600'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-serif'
});
const sans = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

const DESCRIPTION = 'A small house of original channels for stillness, sound and wonder.';

export const viewport: Viewport = {
    themeColor: '#050A1F',
    colorScheme: 'dark'
};

export const metadata: Metadata = {
    metadataBase: new URL('https://www.orionaimedia.com'),
    title: {
        default: 'Orion Ascend Media',
        template: '%s | Orion Ascend Media'
    },
    description: DESCRIPTION,
    alternates: { canonical: 'https://www.orionaimedia.com' },
    openGraph: {
        type: 'website',
        siteName: 'Orion Ascend Media',
        title: 'Orion Ascend Media',
        description: DESCRIPTION,
        url: 'https://www.orionaimedia.com',
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Orion Ascend Media' }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Orion Ascend Media',
        description: DESCRIPTION,
        images: ['/og.png']
    },
    icons: {
        icon: [{ url: '/crest.svg', type: 'image/svg+xml' }],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
    },
    manifest: '/site.webmanifest'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${serif.variable} ${sans.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
                />
            </head>
            <body className="bg-midnight font-sans text-cream antialiased">{children}</body>
        </html>
    );
}
