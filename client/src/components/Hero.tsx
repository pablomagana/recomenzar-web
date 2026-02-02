import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section id="inicio" className="sunrise-bg py-16 md:py-24 relative overflow-hidden">
      {/* Animados rayos de luz */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-0 left-1/2 h-[140%] w-1 bg-white opacity-30"
              style={{
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                transformOrigin: 'bottom',
                animation: `pulse 8s infinite ${i * 0.5}s ease-in-out`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 font-montserrat"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              De las tinieblas a la luz
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-6"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Un nuevo amanecer para tu vida
            </motion.p>
            <motion.h2 
              className="text-2xl md:text-3xl font-medium mb-8"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              ¿Tú o un ser querido luchan con la adicción?
            </motion.h2>
            <motion.p 
              className="mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Descubre un acompañamiento profesional y humano para reconstruir tu vida con dignidad y esperanza.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button 
                onClick={() => scrollToSection('contacto')}
                variant="outline"
                className="px-6 py-6 bg-white text-amber-700 rounded-full font-bold hover:bg-neutral-200 transition duration-300 hover:scale-105 transform"
              >
                Contáctanos
              </Button>
              <Button 
                onClick={() => scrollToSection('servicios')}
                className="px-6 py-6 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition duration-300 hover:scale-105 transform"
              >
                Nuestros Servicios
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-full h-96 rounded-lg relative overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Manos unidas en señal de apoyo y solidaridad" 
                className="w-full h-full object-cover transition-transform duration-15000 hover:scale-110 transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-2">Un camino hacia la recuperación</h3>
                  <p>Unidos en el proceso de sanación y renacimiento personal</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      

    </section>
  );
};

export default Hero;
