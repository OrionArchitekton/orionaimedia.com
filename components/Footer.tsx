import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
    const nav = [
        ['Home', '/'],
        ['Playbook', '/playbook'],
        ['Contact', '/contact']
    ] as const;
    return (
        <footer className="mt-16 border-t border-royal-shade/30 bg-graphite-900/70" role="contentinfo">
            <div className="container-edge py-10 grid gap-6 md:grid-cols-4">
                <div className="col-span-1">
                    <div className="flex items-center gap-2">
                        <Logo className="h-8 w-8" />
                        <div className="text-gold-gradient font-semibold">ORION ASCEND</div>
                    </div>
                    <p className="mt-3 text-sm text-metal-text/70">
                        An operating subsidiary of Orion Apex Capital<br/>
                        <span className="text-gold-g1 mt-1 block">Acquire • Improve • Recycle</span>
                    </p>
                </div>
                <nav className="col-span-3 flex flex-wrap gap-x-8 gap-y-3 items-center md:justify-end" aria-label="Footer navigation">
                    {nav.map(([label, href]) => (
                        <Link key={href} href={href} className="text-sm text-metal-text/80 hover:text-pulse-hover">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="container-edge py-4 text-center md:text-left text-xs text-metal-text/60 border-t border-royal-shade/30">
                <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
                    <div>© {new Date().getFullYear()} Orion Ascend Media</div>
                    <div>
                        <a className="text-pulse-cyan hover:text-pulse-hover" href="https://orionintelligenceagency.com" target="_blank" rel="noreferrer">OIA</a>
                        <span className="mx-2">·</span>
                        <a className="text-pulse-cyan hover:text-pulse-hover" href="https://orionapexcapital.com" target="_blank" rel="noreferrer">Apex</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

