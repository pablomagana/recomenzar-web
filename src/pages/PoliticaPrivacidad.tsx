import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-green">
          <h1 className="text-3xl font-bold text-green-900 font-montserrat mb-8">Política de Privacidad</h1>
          <p className="text-sm text-gray-500 mb-8">Última actualización: 28 de marzo de 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">1. Responsable del tratamiento</h2>
            <ul className="list-none space-y-1 text-gray-700">
              <li><strong>Identidad:</strong> Fundación Recomenzar</li>
              <li><strong>Email:</strong> info@recomenzar.es</li>
              <li><strong>Teléfono:</strong> 610 03 01 38</li>
              <li><strong>Ubicación:</strong> Valencia, España</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">2. Datos que recopilamos</h2>
            <p className="text-gray-700">Recopilamos los datos personales que nos proporcionas voluntariamente a través de:</p>
            <h3 className="text-lg font-semibold text-green-700 mt-4">Formulario de contacto</h3>
            <p className="text-gray-700">Nombre, email y teléfono (opcional) para atender tu consulta.</p>
            <h3 className="text-lg font-semibold text-green-700 mt-4">Formulario de alta</h3>
            <p className="text-gray-700">Nombre, email, teléfono, relación con la persona afectada y método de contacto preferido.</p>
            <h3 className="text-lg font-semibold text-green-700 mt-4">Catálogo Solidario (pedidos)</h3>
            <p className="text-gray-700">Nombre completo, email, teléfono, dirección postal completa (calle, ciudad, código postal, provincia) y notas opcionales de entrega.</p>
            <h3 className="text-lg font-semibold text-green-700 mt-4">Suscripción al boletín</h3>
            <p className="text-gray-700">Dirección de email.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">3. Finalidad del tratamiento</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Formularios de contacto y alta:</strong> Gestionar tu solicitud y ponernos en contacto contigo.</li>
              <li><strong>Pedidos del catálogo:</strong> Procesar y gestionar tu pedido, coordinar el envío y enviarte confirmación por email.</li>
              <li><strong>Boletín:</strong> Enviarte comunicaciones informativas sobre la fundación.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">4. Base legal</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Consentimiento:</strong> Al enviar cualquier formulario, otorgas tu consentimiento explícito para el tratamiento de tus datos para la finalidad indicada (Art. 6.1.a RGPD).</li>
              <li><strong>Ejecución de contrato:</strong> Para los pedidos del catálogo, el tratamiento es necesario para la ejecución del contrato de compraventa (Art. 6.1.b RGPD).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">5. Conservación de datos</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Consultas y contacto:</strong> Hasta la resolución de la consulta y un máximo de 12 meses.</li>
              <li><strong>Pedidos:</strong> Durante la vigencia de la relación comercial y los plazos legales de conservación fiscal (5 años).</li>
              <li><strong>Boletín:</strong> Hasta que solicites la baja.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">6. Destinatarios</h2>
            <p className="text-gray-700">Tus datos podrán ser comunicados a:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Web3Forms:</strong> Proveedor de procesamiento de formularios para contacto y boletín.</li>
              <li><strong>Brevo (Sendinblue):</strong> Proveedor de envío de emails transaccionales (confirmaciones de pedido).</li>
              <li>No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo, salvo las necesarias para los proveedores mencionados, que cuentan con las garantías adecuadas.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">7. Derechos del interesado</h2>
            <p className="text-gray-700">Conforme al RGPD y la LOPD-GDD, tienes derecho a:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Acceso:</strong> Conocer qué datos tuyos tratamos.</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos.</li>
              <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos.</li>
              <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento.</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Para ejercer estos derechos, envía un email a <a href="mailto:info@recomenzar.es" className="text-green-700 underline">info@recomenzar.es</a> indicando
              el derecho que deseas ejercer y adjuntando copia de tu DNI.
            </p>
            <p className="text-gray-700 mt-2">
              También puedes presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">www.aepd.es</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">8. Seguridad</h2>
            <p className="text-gray-700">
              Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra el acceso no autorizado,
              la alteración, divulgación o destrucción. La comunicación con nuestros servidores se realiza mediante protocolo HTTPS cifrado.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t text-sm text-gray-500">
            <Link href="/" className="text-green-700 hover:underline">← Volver al inicio</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
