import React from 'react';

const Testimonials: React.FC = () => {
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

  return (
    <section className="py-16 feature-gradient text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat">Historias de Recomenzar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="mb-4">{testimonial.quote}</p>
                  <p className="font-semibold">{testimonial.name}, {testimonial.age} años</p>
                  <p className="text-sm text-white text-opacity-70">{testimonial.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recovery path image */}
        <div className="mt-12 text-center">
          <div className="inline-block rounded-lg overflow-hidden max-w-md">
            <div className="relative w-full h-64">
              <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8BC34A" />
                    <stop offset="100%" stopColor="#33691E" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="800" height="400" fill="url(#pathGradient)" fillOpacity="0.3" />
                <path d="M100,350 C200,330 300,380 400,350 C500,320 600,370 700,340" 
                      stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
                <circle cx="650" cy="342" r="15" fill="#FFFFFF" />
                <g transform="translate(150, 342)">
                  <rect x="-10" y="-25" width="20" height="25" fill="#000000" />
                  <circle cx="0" cy="-35" r="10" fill="#000000" />
                </g>
              </svg>
            </div>
            <div className="p-4 text-center bg-white bg-opacity-10">
              <p className="text-lg font-montserrat">¡Tu camino con nosotros!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
