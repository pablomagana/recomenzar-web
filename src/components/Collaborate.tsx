import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Building } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

const Collaborate: React.FC = () => {
  const collaborationOptions = [
    {
      icon: <Heart className="w-8 h-8 text-amber-700" />,
      title: "Donaciones",
      description: "Tu aportación económica nos permite seguir ayudando a quienes más lo necesitan.",
      action: "Donar ahora"
    },
    {
      icon: <Users className="w-8 h-8 text-amber-700" />,
      title: "Voluntariado",
      description: "Comparte tu tiempo y habilidades. Tu presencia puede marcar la diferencia.",
      action: "Ser voluntario"
    },
    {
      icon: <Building className="w-8 h-8 text-amber-700" />,
      title: "Empresas",
      description: "Colabora como empresa ofreciendo prácticas, empleo o recursos para la reinserción.",
      action: "Colaboración empresarial"
    }
  ];

  return (
    <section id="colabora" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 font-montserrat">Colabora con Recomenzar</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">Tu apoyo puede transformar vidas. Hay muchas formas de colaborar.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collaborationOptions.map((option, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-green-800">{option.title}</h3>
                <p className="text-gray-700 text-center mb-4">{option.description}</p>
                <Button 
                  onClick={() => scrollToSection('contacto')}
                  className="px-5 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-300"
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborate;
