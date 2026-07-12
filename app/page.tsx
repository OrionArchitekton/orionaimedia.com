import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimateInClient from '@/components/AnimateInClient';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Orion Ascend Media',
    description: 'Acquire. Improve. Recycle.',
    alternates: { canonical: 'https://www.orionaimedia.com' },
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
                <Section className="pt-12 md:pt-20 pb-12">
                    <Container>
                        <div className="grid lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-8">
                                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                                    Orion Ascend Media
                                </h1>
                                <p className="text-xl text-gold-g1 font-medium mb-6">
                                    Acquire. Improve. Recycle.
                                </p>
                                <p className="text-lg text-metal-text/80 leading-relaxed max-w-2xl mb-12">
                                    Orion Ascend Media is an internal digital-asset acquisition and growth arm within the Orion Apex Capital ecosystem, governed by Orion Apex Capital. Orion Ascend Media operates as an internal growth and asset optimization arm governed by Orion Apex Capital, not as a client-facing agency.
                                </p>
                                
                                {/* 3-Card Grid Integrated under Hero */}
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <div className="surface-card p-5">
                                        <h3 className="text-sm font-semibold text-white mb-2">Acquire</h3>
                                        <p className="text-sm text-metal-text/70 leading-snug">Undervalued websites, domains, and content assets.</p>
                                    </div>
                                    <div className="surface-card p-5">
                                        <h3 className="text-sm font-semibold text-white mb-2">Improve</h3>
                                        <p className="text-sm text-metal-text/70 leading-snug">SEO, UX, content operations, and monetization systems.</p>
                                    </div>
                                    <div className="surface-card p-5">
                                        <h3 className="text-sm font-semibold text-white mb-2">Recycle</h3>
                                        <p className="text-sm text-metal-text/70 leading-snug">Demand and capital into OIA or downstream exits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>

                <AnimateInClient as="section" className="container-edge py-10 border-t border-white/5" y={10}>
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-3">
                            <div className="badge">Mandate</div>
                        </div>
                        <div className="md:col-span-9">
                            <p className="text-base md:text-lg text-metal-text/90 leading-relaxed max-w-3xl">
                                OAM acquires undervalued digital properties, improves them through disciplined systems, and recycles the resulting cash flow or demand back into the Orion ecosystem. Assets are evaluated, operated, and exited with the same capital discipline applied across all Orion Apex subsidiaries.
                            </p>
                            <p className="mt-4 text-metal-text/60 italic text-sm">
                                OAM does not operate as a retail agency. It functions as an internal operating arm, governed by Orion Apex Capital.
                            </p>
                        </div>
                    </div>
                </AnimateInClient>

                <AnimateInClient as="section" className="container-edge py-10 border-t border-white/5" delay={0.05}>
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-3">
                            <div className="badge">Governance</div>
                        </div>
                        <div className="md:col-span-9">
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 text-xs mt-1.5">●</span>
                                    <span className="text-sm text-metal-text/80">No guaranteed outcomes</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 text-xs mt-1.5">●</span>
                                    <span className="text-sm text-metal-text/80">No traffic arbitrage or gray-hat tactics</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 text-xs mt-1.5">●</span>
                                    <span className="text-sm text-metal-text/80">Assets must meet quality & compliance thresholds</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 text-xs mt-1.5">●</span>
                                    <span className="text-sm text-metal-text/80">Capital deployment is staged and reversible</span>
                                </li>
                            </ul>
                            <div className="text-metal-text/50 text-xs uppercase tracking-wider font-medium">
                                Growth is earned, not assumed.
                            </div>
                        </div>
                    </div>
                </AnimateInClient>

                <AnimateInClient as="section" className="container-edge py-10 border-t border-white/5 mb-8" delay={0.1}>
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-3">
                            <div className="badge">Oversight</div>
                        </div>
                        <div className="md:col-span-9">
                            <p className="text-base text-metal-text/90">
                                Orion Ascend Media is an operating subsidiary governed by <strong className="text-white">Orion Apex Capital</strong>, which provides capital discipline, risk constraints, and portfolio-level oversight.
                            </p>
                        </div>
                    </div>
                </AnimateInClient>
            </main>
            <Footer />
        </>
    );
}
