import Link from 'next/link';

export default function SiteFooter() {
    return (
        <footer className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-cream/80">
            <p>All work here is made with AI-assisted production, including AI voices, music and imagery.</p>
            <p className="mt-2">
                <a href="mailto:hello@orionaimedia.com" className="inline-flex min-h-[44px] items-center px-2 hover:text-gold-light">
                    hello@orionaimedia.com
                </a>
                <span aria-hidden="true"> · </span>
                <Link href="/privacy" className="inline-flex min-h-[44px] items-center px-2 hover:text-gold-light">
                    Privacy
                </Link>
            </p>
        </footer>
    );
}
