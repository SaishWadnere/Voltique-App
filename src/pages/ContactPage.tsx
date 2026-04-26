import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import FAQ from '../components/contact/FAQ';

export default function ContactPage() {
  return (
    <main className="pt-24 pb-0">
      {/* Hero */}
      <div className="text-center pb-16 relative overflow-hidden">
        <span className="text-label-uppercase text-secondary tracking-widest">Concierge Support</span>
        <h1 className="text-4xl md:text-5xl font-black text-primary mt-3 mb-4">How can we help?</h1>
        <p className="text-on-surface-variant max-w-lg mx-auto">
          Whether you're inquiring about our latest digital artifacts or require technical
          engineering support, our specialists are standing by to assist.
        </p>
      </div>

      {/* Form + Info */}
      <div className="container-main pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>

      <FAQ />
    </main>
  );
}
