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
                <AnimateInClient as="section" className="container-edge py-16 text-center">
                    <h1 className="gold-emboss text-3xl md:text-5xl mb-8">Contact Orion Ascend Media</h1>
                    
                    <div className="max-w-2xl mx-auto surface-card p-8 md:p-12">
                        <p className="text-lg text-metal-text/90 mb-6 font-semibold">
                            Orion Ascend Media does not offer open retail services.
                        </p>
                        <p className="text-metal-text/80 mb-8 leading-relaxed">
                            Inquiries related to asset partnerships, acquisitions, or Orion Apex Capital engagements should be directed through the parent organization.
                        </p>
                        
                        <div className="flex justify-center">
                            <ButtonLink 
                                href="https://orionapexcapital.com/contact" 
                                className="px-8 py-4 text-base"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Contact Orion Apex Capital
                            </ButtonLink>
                        </div>
                    </div>
                </AnimateInClient>
            </main>
            <Footer />
        </>
    );
}