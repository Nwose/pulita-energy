"use client";

import ContactForm from "../../components/Contact/ContactForm";
import ContactSection from "../../components/Contact/ContactSection";

const Contact = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4 lg:px-8 font-satoshi">
      <div className="max-w-7xl mx-auto">
        <ContactForm />
        <ContactSection />
      </div>
    </section>
  );
};

export default Contact;
