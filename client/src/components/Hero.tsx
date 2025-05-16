import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="inicio" className="sunrise-bg py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">De las tinieblas a la luz</h1>
            <p className="text-xl md:text-2xl mb-6">Un nuevo amanecer para tu vida</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">¿Tú o un ser querido luchan con la adicción?</h2>
            <p className="mb-8 text-lg">Descubre un acompañamiento profesional y humano para reconstruir tu vida con dignidad y esperanza.</p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection('contacto')}
                variant="outline"
                className="px-6 py-6 bg-white text-amber-700 rounded-full font-bold hover:bg-neutral-200 transition duration-300"
              >
                Contáctanos
              </Button>
              <Button 
                onClick={() => scrollToSection('servicios')}
                className="px-6 py-6 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition duration-300"
              >
                Nuestros Servicios
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Silhouette of people holding hands */}
            <div className="w-full h-80 bg-black bg-opacity-50 rounded-lg relative overflow-hidden">
              <img src="assets/montana.jpg" alt="montain" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
