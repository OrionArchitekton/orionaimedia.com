import Link from 'next/link';

export default function SiteFooter() {
    return (
        <footer className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-cream/60">
            <p>All work here is made with AI-assisted production, including AI voices, music and imagery.</p>
            <p className="mt-2">
                <a href="mailto:hello@orionaimedia.com" className="hover:text-gold-light">
                    hello@orionaimedia.com
                </a>
                <span aria-hidden="true"> · </span>
                <Link href="/privacy" className="hover:text-gold-light">
                    Privacy
                </Link>
            </p>
        </footer>
    );
}
