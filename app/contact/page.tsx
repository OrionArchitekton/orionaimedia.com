import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimateInClient from '@/components/AnimateInClient';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact — Orion Ascend Media',
    description: 'Contact Orion Ascend Media.',
    openGraph: {
        title: 'Contact — Orion Ascend Media',
        description: 'Contact Orion Ascend Media.',
    }
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="relative z-content min-h-[60vh] flex flex-col justify-center">
                <AnimateInClient as="section" className="container-edge py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">Contact Orion Ascend Media</h1>
                        
                        <div className="surface-card p-8 md:p-10">
                            <p className="text-lg text-metal-text/90 mb-4 font-medium">
                                Orion Ascend Media does not offer open retail services.
                            </p>
                            <p className="text-metal-text/70 mb-8 leading-relaxed max-w-2xl">
                                Inquiries related to asset partnerships, acquisitions, or Orion Apex Capital engagements should be directed through the parent organization.
                            </p>
                            
                            <div>
                                <ButtonLink 
                                    href="https://orionapexcapital.com/contact" 
                                    className="px-6 py-3 text-sm font-medium inline-flex items-center"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Contact Orion Apex Capital
                                    <span className="ml-2">→</span>
                                </ButtonLink>
                            </div>
                        </div>
                    </div>
                </AnimateInClient>
            </main>
            <Footer />
        </>
    );
}
