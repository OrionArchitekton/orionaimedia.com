"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';

export default function Header() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onResize = () => setOpen(false);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    const nav = [
        ['Ascend', '/'],
        ['Playbook', '/playbook'],
        ['Contact', '/contact']
    ] as const;
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-header backdrop-blur bg-graphite-900/70 border-b border-royal-shade/30">
            <div className="container-edge py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group" aria-label="Orion Ascend Media — Home">
                    <Logo className="h-8 w-8" />
                    <span className="text-lg font-semibold text-gold-gradient tracking-wide" style={{ fontFamily: 'Cinzel, ui-serif' }}>
                        ORION ASCEND
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                    {nav.map(([label, href]) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={active ? 'page' : undefined}
                                className={`text-sm metallic hover:text-pulse-hover transition-colors${active ? ' text-gold-g0' : ''}`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>
                <button
                    className="md:hidden rounded-button px-3 py-2 border border-royal-shade/50"
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    aria-label="Toggle menu"
                >
                    Menu
                </button>
            </div>
            {open && (
                <div id="mobile-nav" className="md:hidden container-edge pb-4 grid gap-2" aria-label="Mobile navigation">
                    {nav.map(([label, href]) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={active ? 'page' : undefined}
                                className={`rounded-button px-3 py-2 bg-graphite-800/70 hover:bg-graphite-800 border border-royal-shade/40${active ? ' border-pulse-hover/60' : ''}`}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}

