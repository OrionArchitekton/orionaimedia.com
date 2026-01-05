import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
    const nav = [
        ['Home', '/'],
        ['Playbook', '/playbook'],
        ['Contact', '/contact']
    ] as const;
    return (
        <footer className="mt-16 border-t border-white/5 bg-graphite-900/50 backdrop-blur-sm" role="contentinfo">
            <div className="container-edge py-12 grid gap-8 md:grid-cols-4">
                <div className="col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <Logo className="h-6 w-6 opacity-80" />
                        <div className="text-white font-semibold tracking-wide text-sm">ORION ASCEND</div>
                    </div>
                    <p className="text-xs text-metal-text/60 leading-relaxed">
                        An operating subsidiary of Orion Apex Capital
                    </p>
                    <div className="text-gold-g1/80 text-xs font-medium mt-2 tracking-wide uppercase">
                        Acquire • Improve • Recycle
                    </div>
                </div>
                <nav className="col-span-3 flex flex-wrap gap-x-8 gap-y-3 items-start md:justify-end" aria-label="Footer navigation">
                    {nav.map(([label, href]) => (
                        <Link key={href} href={href} className="text-sm text-metal-text/60 hover:text-white transition-colors">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="container-edge py-6 text-xs text-metal-text/40 border-t border-white/5">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                    <div>© {new Date().getFullYear()} Orion Ascend Media</div>
                    <div className="flex gap-4">
                        <a className="hover:text-white transition-colors" href="https://orionintelligenceagency.com" target="_blank" rel="noreferrer">OIA</a>
                        <a className="hover:text-white transition-colors" href="https://orionapexcapital.com" target="_blank" rel="noreferrer">Apex</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

