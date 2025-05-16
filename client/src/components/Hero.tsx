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
              <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="sunset" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF9500" />
                    <stop offset="100%" stopColor="#FFCC00" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="800" height="400" fill="url(#sunset)" />
                <g fill="#000000">
                  <path d="M200,300 C200,240 180,240 180,240 L200,260 L220,240 C220,240 200,240 200,300 Z" />
                  <path d="M300,300 C300,240 280,240 280,240 L300,260 L320,240 C320,240 300,240 300,300 Z" />
                  <path d="M400,300 C400,240 380,240 380,240 L400,260 L420,240 C420,240 400,240 400,300 Z" />
                  <path d="M500,300 C500,240 480,240 480,240 L500,260 L520,240 C520,240 500,240 500,300 Z" />
                  <path d="M600,300 C600,240 580,240 580,240 L600,260 L620,240 C620,240 600,240 600,300 Z" />
                  
                  <rect x="190" y="300" width="20" height="80" />
                  <rect x="290" y="300" width="20" height="80" />
                  <rect x="390" y="300" width="20" height="80" />
                  <rect x="490" y="300" width="20" height="80" />
                  <rect x="590" y="300" width="20" height="80" />
                  
                  <path d="M220,300 L280,300" />
                  <path d="M320,300 L380,300" />
                  <path d="M420,300 L480,300" />
                  <path d="M520,300 L580,300" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
