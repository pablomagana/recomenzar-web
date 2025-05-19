import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Brain, Briefcase, HandHelping, Users, Heart, Stars } from 'lucide-react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const serviceSection = document.getElementById('servicios');
      if (serviceSection) {
        const rect = serviceSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Briefcase className="w-10 h-10 text-amber-600" />,
      title: "Reinserción",
      description: "Te ayudamos a reintegrarte en la sociedad con nuevas herramientas y oportunidades",
      items: [
        "Búsqueda de empleo, estudios y redes de apoyo",
        "Talleres de rehabilitación y crecimiento personal",
        "Acompañamiento para la reintegración social"
      ],
      color: "bg-amber-100"
    },
    {
      icon: <Brain className="w-10 h-10 text-green-600" />,
      title: "Atención Psicológica",
      description: "Profesionales cualificados para ayudarte en tu proceso de recuperación",
      items: [
        "Sesiones uno a uno con profesionales colegiados",
        "Terapias grupales",
        "Terapias de rehabilitación y crecimiento personal"
      ],
      color: "bg-green-100"
    },
    {
      icon: <HandHelping className="w-10 h-10 text-blue-600" />,
      title: "Acompañamiento",
      description: "Nunca más estarás solo/a en este proceso de transformación",
      items: [
        "Acompañamiento espiritual (Opcional)",
        "Gestión emocional y hábitos saludables",
        "Desarrollo de proyecto de vida"
      ],
      color: "bg-blue-100"
    }
  ];

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="servicios" className="py-16 bg-gray-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-amber-500"></div>
        <div className="absolute top-3/4 right-10 w-64 h-64 rounded-full bg-green-500"></div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full bg-blue-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 font-montserrat">
            Nuestros Servicios
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded"></div>
          <p className="text-center text-lg max-w-3xl mx-auto">
            Ofrecemos un programa integral de recuperación y reinserción para personas con drogodependencias,
            diseñado para atender todas las dimensiones del proceso de rehabilitación
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUpVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <Card className={`${service.color} border-none overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col`}>
                <CardHeader className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-4 transform transition-transform duration-500 hover:rotate-12">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-green-800">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="p-6 bg-white rounded-t-3xl flex-grow">
                  <ul className="space-y-4">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-lg text-gray-700 italic mb-6">
            "Nuestro enfoque integral te acompaña en cada paso del proceso de recuperación"
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1,
                  delay: i * 0.1
                }}
              >
                <span className="text-amber-500 text-2xl">★</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
