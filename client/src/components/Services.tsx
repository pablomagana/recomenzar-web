import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Brain, Briefcase, HandHelping } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Briefcase className="w-6 h-6 text-green-600" />,
      title: "Reinserción",
      items: [
        "Búsqueda de empleo, estudios y redes de apoyo",
        "Talleres de rehabilitación y crecimiento personal",
        "Acompañamiento para la reintegración social"
      ]
    },
    {
      icon: <Brain className="w-6 h-6 text-green-600" />,
      title: "Atención Psicológica",
      items: [
        "Sesiones uno a uno con profesionales colegiados",
        "Terapias grupales",
        "Terapias de rehabilitación y crecimiento personal"
      ]
    },
    {
      icon: <HandHelping className="w-6 h-6 text-green-600" />,
      title: "Acompañamiento",
      items: [
        "Acompañamiento espiritual (Opcional)",
        "Gestión emocional y hábitos saludables",
        "Desarrollo de proyecto de vida"
      ]
    }
  ];

  return (
    <section id="servicios" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 font-montserrat">Nuestros Servicios</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">Ofrecemos un programa integral de recuperación y reinserción para personas con drogodependencias</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <CardHeader className="p-6 border-b-2 border-green-100">
                <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-green-800">{service.title}</h3>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
