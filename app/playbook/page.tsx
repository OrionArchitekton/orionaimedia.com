import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimateInClient from '@/components/AnimateInClient';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Playbook — Orion Ascend Media',
    description: 'The Ascend Flywheel: Acquire, Improve, Recycle.',
    openGraph: {
        title: 'Playbook — Orion Ascend Media',
        description: 'The Ascend Flywheel: Acquire, Improve, Recycle.',
    }
};

export default function PlaybookPage() {
    return (
        <>
            <Header />
            <main className="relative z-content">
                <Section className="py-20 md:py-28">
                    <Container className="text-center">
                        <h1 className="gold-emboss text-4xl md:text-5xl lg:text-6xl mb-6">The Ascend Flywheel</h1>
                        <div className="text-xl md:text-2xl text-gold-g1 font-semibold tracking-wider">
                            Acquire → Improve → Recycle
                        </div>
                        <p className="mt-6 text-metal-text/70 italic max-w-2xl mx-auto">
                            This flywheel governs every OAM asset.
                        </p>
                    </Container>
                </Section>

                <AnimateInClient as="section" className="container-edge py-12" y={16}>
                    <div className="grid gap-12 max-w-4xl mx-auto">
                        
                        {/* 1. Acquire */}
                        <div className="surface-card p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-bold text-gold-g1 leading-none select-none">1</div>
                            <h2 className="text-2xl md:text-3xl text-gold-g1 mb-6 font-semibold">Acquire</h2>
                            <p className="text-metal-text/90 mb-4 text-lg">We acquire assets that are:</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Structurally sound</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Under-optimized (not broken)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Capable of compounding with systems, not brute force</span>
                                </li>
                            </ul>
                            <p className="text-metal-text/70 text-sm border-t border-royal-shade/20 pt-4">
                                Examples include niche content sites, domain portfolios, and underperforming digital properties.
                            </p>
                        </div>

                        {/* 2. Improve */}
                        <div className="surface-card p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-bold text-gold-g1 leading-none select-none">2</div>
                            <h2 className="text-2xl md:text-3xl text-gold-g1 mb-6 font-semibold">Improve</h2>
                            <p className="text-metal-text/90 mb-4 text-lg">Improvements focus on durable levers:</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Technical SEO and information architecture</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Content systems and publishing cadence</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">UX clarity and conversion paths</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Monetization alignment (ads, affiliates, lead routing)</span>
                                </li>
                            </ul>
                            <p className="text-metal-text/70 text-sm border-t border-royal-shade/20 pt-4">
                                No one-off hacks. Only repeatable systems.
                            </p>
                        </div>

                        {/* 3. Recycle */}
                        <div className="surface-card p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-bold text-gold-g1 leading-none select-none">3</div>
                            <h2 className="text-2xl md:text-3xl text-gold-g1 mb-6 font-semibold">Recycle</h2>
                            <p className="text-metal-text/90 mb-4 text-lg">Assets are recycled through:</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Cash-flow harvesting</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Demand routing into Orion Intelligence Agency</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1">❖</span>
                                    <span className="text-metal-text/80">Strategic resale when risk-adjusted returns peak</span>
                                </li>
                            </ul>
                            <p className="text-metal-text/70 text-sm border-t border-royal-shade/20 pt-4">
                                Capital is redeployed deliberately, not reflexively.
                            </p>
                        </div>

                    </div>
                </AnimateInClient>

                <AnimateInClient as="section" className="container-edge py-12 mb-16" delay={0.1}>
                    <div className="badge">Operating Principles</div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3 text-center">
                        <div className="surface-card p-6 border-gold-g1/20 border">
                            <div className="text-xl text-gold-g1 font-semibold mb-2">Measure</div>
                            <div className="text-metal-text/80">before scaling</div>
                        </div>
                        <div className="surface-card p-6 border-gold-g1/20 border">
                            <div className="text-xl text-gold-g1 font-semibold mb-2">Optimize</div>
                            <div className="text-metal-text/80">before expanding</div>
                        </div>
                        <div className="surface-card p-6 border-gold-g1/20 border">
                            <div className="text-xl text-gold-g1 font-semibold mb-2">Exit</div>
                            <div className="text-metal-text/80">before decay</div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-metal-text/60 italic">
                        This is asset management, not content farming.
                    </div>
                </AnimateInClient>
            </main>
            <Footer />
        </>
    );
}
