import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="sky flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="font-serif text-4xl font-semibold text-gold-light">Page not found</h1>
            <p className="mt-3 text-sm text-cream/80">This page does not exist.</p>
            <Link href="/" className="mt-6 text-gold hover:text-gold-light">
                Back to Orion Ascend Media
            </Link>
        </main>
    );
}
