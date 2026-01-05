import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimateInClient from '@/components/AnimateInClient';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Orion Ascend Media',
    description: 'Acquire. Improve. Recycle.',
    alternates: { canonical: 'https://www.orionaimedia.com/' },
    openGraph: {
        title: 'Orion Ascend Media',
        description: 'Acquire. Improve. Recycle.',
        url: 'https://www.orionaimedia.com',
        images: ['/og/home']
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Orion Ascend Media',
        description: 'Acquire. Improve. Recycle.',
        images: ['/og/home']
    }
};

export default function HomePage() {
    return (
        <>
            <Header />
            <main className="relative z-content">
                <Section className="overflow-hidden min-h-[60vh] flex flex-col justify-center">
                    <Container className="pt-16 md:pt-20 pb-16 md:pb-24 text-center">
                        <div className="relative mx-auto mb-6 w-full max-w-3xl">
                            <div className="absolute -inset-12 rounded-full ring-gold blur-sm" aria-hidden />
                            <h1 className="gold-emboss text-4xl md:text-6xl lg:text-7xl leading-tight tracking-[0.02em]" aria-label="Orion Ascend Media">ORION ASCEND MEDIA</h1>
                        </div>
                        <p className="mt-4 max-w-3xl mx-auto text-xl md:text-2xl text-gold-g1 tracking-widest uppercase font-semibold">
                            Acquire. Improve. Recycle.
                        </p>
                        <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-metal-text/90">
                            Orion Ascend Media is a governed digital-asset acquisition and growth arm within the Orion Apex Capital ecosystem.
                        </p>
                    </Container>
                </Section>

                <AnimateInClient as="section" className="container-edge py-12" y={16}>
                    <div className="badge">Mandate</div>
                    <div className="mt-4 surface-card p-8">
                        <p className="text-lg text-metal-text/90 leading-relaxed">
                            OAM acquires undervalued digital properties, improves them through disciplined systems, and recycles the resulting cash flow or demand back into the Orion ecosystem. Assets are evaluated, operated, and exited with the same capital discipline applied across all Orion Apex subsidiaries.
                        </p>
                        <p className="mt-4 text-metal-text/70 italic">
                            OAM does not operate as a retail agency. It functions as an internal operating arm, governed by Orion Apex Capital.
                        </p>
                    </div>
                </AnimateInClient>

                <AnimateInClient as="section" className="container-edge py-12" delay={0.05}>
                    <div className="badge">What OAM Does</div>
                    <div className="mt-4 grid gap-6 md:grid-cols-3">
                        <div className="surface-card p-6">
                            <h3 className="text-xl text-gold-g1 mb-3 font-semibold">Acquire</h3>
                            <p className="text-metal-text/80">Undervalued websites, domains, and content assets</p>
                        </div>
                        <div className="surface-card p-6">
                            <h3 className="text-xl text-gold-g1 mb-3 font-semibold">Improve</h3>
                            <p className="text-metal-text/80">SEO, UX, content operations, and monetization systems</p>
                        </div>
                        <div className="surface-card p-6">
                            <h3 className="text-xl text-gold-g1 mb-3 font-semibold">Recycle</h3>
                            <p className="text-metal-text/80">Demand and capital into OIA or downstream exits</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center text-metal-text/60 small-caps tracking-wider">
                        Every asset is operated against explicit KPIs, not vibes.
                    </div>
                </AnimateInClient>

                <AnimateInClient as="section" className="container-edge py-12" delay={0.1}>
                    <div className="badge">Governance & Constraints</div>
                    <div className="mt-4 surface-card p-8">
                        <ul className="grid gap-4 md:grid-cols-2">
                            <li className="flex items-start gap-3">
                                <span className="text-gold-g1 mt-1">❖</span>
                                <span className="text-metal-text/90">No guaranteed outcomes</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold-g1 mt-1">❖</span>
                                <span className="text-metal-text/90">No traffic arbitrage or gray-hat tactics</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold-g1 mt-1">❖</span>
                                <span className="text-metal-text/90">Assets must meet quality, compliance, and durability thresholds</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold-g1 mt-1">❖</span>
                                <span className="text-metal-text/90">Capital deployment is staged and reversible</span>
                            </li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-royal-shade/20 text-center text-metal-text/70 italic">
                            Growth is earned, not assumed.
                        </div>
                    </div>
                </AnimateInClient>

                <AnimateInClient as="section" className="container-edge py-12 mb-12" delay={0.15}>
                    <div className="badge">Relationship to Orion Apex Capital</div>
                    <div className="mt-4 surface-card p-8 text-center">
                        <p className="text-lg text-metal-text/90">
                            Orion Ascend Media is an operating subsidiary governed by <strong className="text-gold-g1">Orion Apex Capital</strong>, which provides capital discipline, risk constraints, and portfolio-level oversight.
                        </p>
                    </div>
                </AnimateInClient>
            </main>
            <Footer />
        </>
    );
}