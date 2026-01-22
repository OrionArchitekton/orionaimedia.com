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
                <Section className="py-12 md:py-20">
                    <Container>
                        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">The Ascend Flywheel</h1>
                        <div className="text-xl md:text-2xl text-gold-g1 font-medium tracking-wide mb-6">
                            Acquire → Improve → Recycle
                        </div>
                        <p className="text-lg text-metal-text/80 italic max-w-2xl leading-relaxed">
                            This flywheel governs every OAM asset.
                        </p>
                    </Container>
                </Section>

                <AnimateInClient as="section" className="container-edge py-8" y={16}>
                    <div className="grid gap-8 max-w-4xl">
                        
                        {/* 1. Acquire */}
                        <div className="surface-card p-6 md:p-8 relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-gold-g1 font-bold text-xl">01</span>
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Acquire</h2>
                            </div>
                            <p className="text-metal-text/90 mb-4 text-base">We acquire assets that fit repeatable, system-driven criteria:</p>
                            <ul className="space-y-2 mb-6 text-sm md:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Structurally sound</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Under-optimized (not broken)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Capable of compounding through systems, not brute force</span>
                                </li>
                            </ul>
                            <p className="text-metal-text/60 text-sm border-t border-white/5 pt-4">
                                Examples include niche content sites, domain portfolios, and underperforming digital properties.
                            </p>
                        </div>

                        {/* 2. Improve */}
                        <div className="surface-card p-6 md:p-8 relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-gold-g1 font-bold text-xl">02</span>
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Improve</h2>
                            </div>
                            <p className="text-metal-text/90 mb-4 text-base">Improvements focus on durable, repeatable levers:</p>
                            <ul className="space-y-2 mb-6 text-sm md:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Technical SEO and information architecture</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Content systems and publishing cadence</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">UX clarity and conversion paths</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Monetization alignment (ads, affiliates, lead routing)</span>
                                </li>
                            </ul>
                            <p className="text-metal-text/60 text-sm border-t border-white/5 pt-4">
                                No one-off hacks. Only repeatable systems.
                            </p>
                        </div>

                        {/* 3. Recycle */}
                        <div className="surface-card p-6 md:p-8 relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-gold-g1 font-bold text-xl">03</span>
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Recycle</h2>
                            </div>
                            <p className="text-metal-text/90 mb-4 text-base">Assets are recycled through measured redeployment paths:</p>
                            <ul className="space-y-2 mb-6 text-sm md:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Cash-flow harvesting</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Demand routing into Orion Intelligence Agency</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-g1 mt-1.5 text-xs">●</span>
                                    <span className="text-metal-text/80">Strategic resale when risk-adjusted returns peak</span>
                                </li>
                            </ul>
                            <p className="text-metal-text/60 text-sm border-t border-white/5 pt-4">
                                Capital is redeployed deliberately through repeatable systems, not reflexively.
                            </p>
                        </div>

                    </div>
                </AnimateInClient>

                <AnimateInClient as="section" className="container-edge py-12 mb-16" delay={0.1}>
                    <div className="badge mb-6">Operating Principles</div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="surface-card p-6 border-gold-g1/20 border text-center">
                            <div className="text-lg text-gold-g1 font-semibold mb-2">Measure</div>
                            <div className="text-metal-text/80 text-sm">before scaling</div>
                        </div>
                        <div className="surface-card p-6 border-gold-g1/20 border text-center">
                            <div className="text-lg text-gold-g1 font-semibold mb-2">Optimize</div>
                            <div className="text-metal-text/80 text-sm">before expanding</div>
                        </div>
                        <div className="surface-card p-6 border-gold-g1/20 border text-center">
                            <div className="text-lg text-gold-g1 font-semibold mb-2">Exit</div>
                            <div className="text-metal-text/80 text-sm">before decay</div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-metal-text/50 italic text-sm">
                        This is asset management, not content farming.
                    </div>
                    <div className="mt-3 text-center text-metal-text/50 text-sm">
                        This flywheel governs internal assets only and does not represent a retail service or outsourced growth offering.
                    </div>
                </AnimateInClient>
            </main>
            <Footer />
        </>
    );
}
