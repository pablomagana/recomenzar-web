import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AvisoLegal() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-green">
          <h1 className="text-3xl font-bold text-green-900 font-montserrat mb-8">Aviso Legal</h1>
          <p className="text-sm text-gray-500 mb-8">Última actualización: 28 de marzo de 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">1. Datos identificativos</h2>
            <p className="text-gray-700">
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
              Información y Comercio Electrónico (LSSI-CE), se informa:
            </p>
            <ul className="list-none space-y-1 text-gray-700 mt-3">
              <li><strong>Denominación:</strong> Fundación Recomenzar</li>
              <li><strong>Email:</strong> info@recomenzar.es</li>
              <li><strong>Teléfono:</strong> 610 03 01 38</li>
              <li><strong>Ubicación:</strong> Valencia, España</li>
              <li><strong>Sitio web:</strong> www.recomenzar.org</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">2. Objeto</h2>
            <p className="text-gray-700">
              Este sitio web tiene como finalidad informar sobre las actividades de la Fundación Recomenzar,
              dedicada a la reinserción social de personas en situación de vulnerabilidad, así como facilitar la venta
              de productos artesanales elaborados por sus beneficiarios a través del Catálogo Solidario.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">3. Condiciones del Catálogo Solidario</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Los precios mostrados incluyen IVA (cuando aplique) y se expresan en euros (€).</li>
              <li>Los pedidos se gestionan manualmente. Tras realizar un pedido, recibirás un email de confirmación y nuestro equipo se pondrá en contacto contigo para coordinar el pago y envío.</li>
              <li>No disponemos de pasarela de pago online. El pago se coordinará directamente con la fundación.</li>
              <li>Los productos son artesanales y pueden presentar ligeras variaciones respecto a las imágenes.</li>
              <li>Los gastos de envío se comunicarán previamente a la confirmación definitiva del pedido.</li>
              <li>Puedes cancelar tu pedido contactándonos antes de que sea enviado.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">4. Propiedad intelectual</h2>
            <p className="text-gray-700">
              Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseño gráfico, código fuente)
              son propiedad de la Fundación Recomenzar o se utilizan con autorización, y están protegidos por las
              leyes de propiedad intelectual. Queda prohibida su reproducción, distribución o transformación sin
              autorización expresa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">5. Protección de datos</h2>
            <p className="text-gray-700">
              El tratamiento de datos personales se rige por nuestra{' '}
              <Link href="/privacidad" className="text-green-700 underline">Política de Privacidad</Link>,
              conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección
              de Datos Personales y Garantía de los Derechos Digitales (LOPD-GDD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">6. Limitación de responsabilidad</h2>
            <p className="text-gray-700">
              La Fundación Recomenzar no se responsabiliza de los daños que puedan derivarse de interferencias,
              interrupciones, virus informáticos, averías telefónicas o desconexiones en el funcionamiento de este
              sitio web, ni de los contenidos de las páginas web enlazadas desde este sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">7. Legislación aplicable</h2>
            <p className="text-gray-700">
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes
              se someten a los juzgados y tribunales de Valencia, España.
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
