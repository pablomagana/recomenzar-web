import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Collaborate from '@/components/Collaborate';
import ContactForms from '@/components/ContactForms';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <WhyChoose />
        <Services />
        <Process />
        <Testimonials />
        <Collaborate />
        <ContactForms />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
