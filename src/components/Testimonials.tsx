import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote: "Después de años luchando con mi adicción, en Recomenzar encontré no solo un tratamiento, sino una familia que me acompañó en el proceso. Hoy tengo trabajo, he recuperado a mi familia y vivo sin consumir.",
      name: "Carlos",
      age: 34,
      status: "3 años en recuperación"
    },
    {
      quote: "Como familiar de una persona con adicción, encontré en Recomenzar el apoyo que necesitaba para entender y acompañar a mi hijo. Hoy nuestra relación es otra y él está construyendo su futuro.",
      name: "María",
      age: 52,
      status: "Madre de usuario"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 feature-gradient text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Historias de Recomenzar
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start mb-4">
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </motion.div>
                <div className="ml-4">
                  <motion.p 
                    className="mb-4 text-lg italic"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                  >
                    <p className="font-semibold text-amber-200">{testimonial.name}, {testimonial.age} años</p>
                    <p className="text-sm text-white text-opacity-70">{testimonial.status}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="inline-block rounded-lg overflow-hidden max-w-md shadow-2xl">
            <div className="relative w-full h-64">
              <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8BC34A" />
                    <stop offset="100%" stopColor="#33691E" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="800" height="400" fill="url(#pathGradient)" fillOpacity="0.3" />
                <motion.path 
                  d="M100,350 C200,330 300,380 400,350 C500,320 600,370 700,340" 
                  stroke="#FFFFFF" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1.2 }}
                />
                <motion.circle 
                  cx="700" 
                  cy="340" 
                  r="15" 
                  fill="#FFFFFF"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 3 }}
                />
                <motion.g 
                  transform="translate(150, 342)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <rect x="-10" y="-25" width="20" height="25" fill="#000000" />
                  <circle cx="0" cy="-35" r="10" fill="#000000" />
                </motion.g>
              </svg>
            </div>
            <div className="p-4 text-center bg-white bg-opacity-10">
              <p className="text-lg font-montserrat">¡Tu camino con nosotros!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
