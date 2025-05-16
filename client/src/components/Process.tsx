import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Process: React.FC = () => {
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800 font-montserrat">¿Cómo trabajamos contigo?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="bg-gray-50 hover:shadow-lg transition duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800">{step.title}</h3>
                </div>
                <p className="text-gray-700">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-12 text-center">
          <Button 
            onClick={() => scrollToSection('alta')}
            className="px-8 py-6 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 transition duration-300"
          >
            ¡Tu camino con nosotros comienza aquí!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;
