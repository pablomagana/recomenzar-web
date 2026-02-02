import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';

const Process: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const steps = [
    {
      number: 1,
      title: "Evaluación inicial gratuita",
      description: "Entendemos tu situación y diseñamos un plan personalizado para tu recuperación."
    },
    {
      number: 2,
      title: "Tratamiento y talleres",
      description: "Plan a tu medida con revisiones periódicas para asegurar tu progreso."
    },
    {
      number: 3,
      title: "Seguimiento",
      description: "Continuamos acompañándote en tu nueva etapa para asegurar una recuperación sostenible."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800 font-montserrat"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ¿Cómo trabajamos contigo?
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} variants={cardVariants}>
              <Card className="bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full border-t-4 border-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mr-3 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-700">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            onClick={() => scrollToSection('alta')}
            className="px-8 py-6 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
          >
            ¡Tu camino con nosotros comienza aquí!
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
