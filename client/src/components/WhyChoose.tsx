import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const WhyChoose: React.FC = () => {
  return (
    <section id="quienes-somos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800 font-montserrat">
          ¿Por qué elegir Recomenzar?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-gray-50 hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <div className="bg-amber-200 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-700">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">
                Equipo multidisciplinario
              </h3>
              <p className="text-gray-700">
                Psicólogos clínicos, trabajadores sociales, integradores
                sociales y voluntarios especializados trabajando juntos para tu
                recuperación.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-gray-50 hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <div className="bg-amber-200 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-700">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">
                Enfoque integral
              </h3>
              <p className="text-gray-700">
                Atendemos todas las dimensiones de la persona: cuerpo, mente,
                relaciones y espiritualidad para una recuperación completa.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-gray-50 hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <div className="bg-amber-200 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-700">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">
                Aceptación sin prejuicios
              </h3>
              <p className="text-gray-700">
                Aceptamos a cada persona tal como es, sin prejuicios. Creemos en
                el poder del cambio y la recuperación para todos.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center">
                {/* Imagen representativa de la misión */}
                <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8">
                  <div className="rounded-lg shadow-md w-full h-64 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                      alt="Manos unidas en señal de apoyo y solidaridad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">
                    Misión, Visión y Valores
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-green-700 mb-2">Misión:</h4>
                    <p className="text-gray-700">Acompañar y apoyar a las personas con drogodependencias en su proceso de recuperación integral, promoviendo su bienestar físico, emocional y social. Trabajamos para restaurar su dignidad, autonomía y derechos con un enfoque centrado en la persona, el respeto y la inclusión.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-green-700 mb-2">Visión:</h4>
                    <p className="text-gray-700">Ser una organización referente en la atención de personas con adicciones, construyendo una sociedad más humana, solidaria y libre de estigmas.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-green-700 mb-2">Valores:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                      <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Respeto: Aceptamos a cada persona tal como es, sin prejuicios.</li>
                      <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Empatía: Escuchamos y acompañamos desde la comprensión.</li>
                      <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Inclusión: Apostamos por una sociedad donde nadie quede fuera.</li>
                      <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Compromiso: Trabajamos con entrega y responsabilidad.</li>
                      <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Justicia social: Defendemos los derechos de los más vulnerables.</li>
                      <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Esperanza: Creemos en el poder del cambio y la recuperación.</li>
                    </ul>
                  </div>
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
