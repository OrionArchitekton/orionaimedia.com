import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
    title: 'About Orion Ascend Media',
    description:
        'Orion Ascend Media is a governed digital-asset acquisition and optimization subsidiary within the Orion Apex Capital ecosystem.',
    alternates: { canonical: 'https://www.orionaimedia.com/about' },
    openGraph: {
        url: 'https://www.orionaimedia.com/about',
        images: ['/og/about']
    },
    twitter: { images: ['/og/about'], card: 'summary_large_image' }
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="relative z-content">
                <section className="container-edge py-16">
                    <Container>
                        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                            About Orion Ascend Media
                        </h1>
                        <div className="space-y-6 text-metal-text/80 text-lg leading-relaxed max-w-3xl">
                            <p>Orion Ascend Media is a governed digital-asset acquisition and optimization subsidiary within the Orion Apex Capital ecosystem.</p>
                            <p>It acquires structurally sound but under-optimized digital properties and improves them through disciplined systems — including technical SEO, information architecture, publishing cadence, and monetization alignment.</p>
                            <p>Assets are recycled through cash-flow harvesting, strategic resale, or downstream demand routing into Orion Intelligence Agency. Capital is redeployed deliberately, not reflexively.</p>
                            <p>Orion Ascend Media does not operate as a retail agency. It functions as an internal operating arm governed by Orion Apex Capital, with capital discipline, risk constraints, and portfolio-level oversight.</p>
                            <p className="text-sm text-metal-text/60">An operating subsidiary of Orion Apex Capital.</p>
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
        </>
    );
}
