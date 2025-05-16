import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WhyChoose: React.FC = () => {
  return (
    <section id="quienes-somos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800 font-montserrat">¿Por qué elegir Recomenzar?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-gray-50 hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <div className="bg-amber-200 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-700">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">Equipo multidisciplinario</h3>
              <p className="text-gray-700">Psicólogos clínicos, trabajadores sociales, integradores sociales y voluntarios especializados trabajando juntos para tu recuperación.</p>
            </CardContent>
          </Card>
          
          {/* Feature 2 */}
          <Card className="bg-gray-50 hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <div className="bg-amber-200 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-700">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">Enfoque integral</h3>
              <p className="text-gray-700">Atendemos todas las dimensiones de la persona: cuerpo, mente, relaciones y espiritualidad para una recuperación completa.</p>
            </CardContent>
          </Card>
          
          {/* Feature 3 */}
          <Card className="bg-gray-50 hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <div className="bg-amber-200 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-700">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">Aceptación sin prejuicios</h3>
              <p className="text-gray-700">Aceptamos a cada persona tal como es, sin prejuicios. Creemos en el poder del cambio y la recuperación para todos.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center">
                {/* Sunrise/Sunset Image */}
                <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8">
                  <div className="rounded-lg shadow-md w-full h-64 overflow-hidden">
                    <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <linearGradient id="sunriseSky" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FF9500" />
                          <stop offset="100%" stopColor="#FFD700" />
                        </linearGradient>
                        <linearGradient id="land" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#689F38" />
                          <stop offset="100%" stopColor="#33691E" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="800" height="400" fill="url(#sunriseSky)" />
                      <circle cx="400" cy="150" r="80" fill="#FFCC00" />
                      <path d="M0,400 Q200,300 400,350 Q600,300 800,400 L800,600 L0,600 Z" fill="url(#land)" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">Nuestra misión</h3>
                  <p className="text-gray-700 mb-4">En Recomenzar, creemos que toda persona merece una segunda oportunidad. Cuando la sociedad los rechaza, nosotros queremos tenderles la mano, porque sabemos que con el acompañamiento adecuado, es posible cambiar de vida.</p>
                  <p className="text-gray-700">El nombre "Recomenzar" refleja la esencia del proceso que viven las personas que luchan contra las adicciones: una oportunidad para volver a empezar, dejar atrás el dolor y construir una nueva vida con dignidad, apoyo y propósito.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
