import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-green">
          <h1 className="text-3xl font-bold text-green-900 font-montserrat mb-8">Política de Cookies</h1>
          <p className="text-sm text-gray-500 mb-8">Última actualización: 28 de marzo de 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">1. ¿Qué son las cookies?</h2>
            <p className="text-gray-700">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, móvil o tablet)
              cuando los visitas. Se utilizan para que el sitio web funcione correctamente, para mejorar la experiencia del usuario
              y para proporcionar información al propietario del sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">2. Cookies que utilizamos</h2>

            <h3 className="text-lg font-semibold text-green-700 mt-4">Cookies técnicas (necesarias)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Cookie</th>
                    <th className="text-left py-2 pr-4">Finalidad</th>
                    <th className="text-left py-2 pr-4">Duración</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">recomenzar_cart</td>
                    <td className="py-2 pr-4">Almacenar los productos del carrito de compra (localStorage)</td>
                    <td className="py-2 pr-4">Persistente</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">catalogo_admin_token</td>
                    <td className="py-2 pr-4">Sesión de administración del catálogo (localStorage)</td>
                    <td className="py-2 pr-4">Hasta cierre de sesión</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">cookie_consent</td>
                    <td className="py-2 pr-4">Recordar tu preferencia sobre cookies</td>
                    <td className="py-2 pr-4">12 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mt-3">
              Este sitio web <strong>no utiliza cookies de análisis, publicidad ni de terceros con fines de seguimiento</strong>.
              Solo utilizamos almacenamiento local (localStorage) para la funcionalidad esencial del sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">3. ¿Cómo gestionar las cookies?</h2>
            <p className="text-gray-700">
              Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que si desactivas las cookies necesarias,
              algunas funciones del sitio (como el carrito de compra) podrían no funcionar correctamente.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-3">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">4. Base legal</h2>
            <p className="text-gray-700">
              El uso de cookies técnicas necesarias se basa en nuestro interés legítimo de garantizar el funcionamiento del sitio web
              (Art. 6.1.f RGPD). Para cualquier otro tipo de cookie que pudiéramos incorporar en el futuro, solicitaremos tu
              consentimiento previo conforme a la LSSI-CE y el RGPD.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-800">5. Contacto</h2>
            <p className="text-gray-700">
              Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos en{' '}
              <a href="mailto:info@recomenzar.es" className="text-green-700 underline">info@recomenzar.es</a>.
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
