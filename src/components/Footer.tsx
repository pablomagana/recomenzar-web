import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, Send, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;
import { scrollToSection } from '@/lib/utils';

const Footer: React.FC = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nueva suscripción al boletín - Recomenzar',
          email: newsletterEmail,
        }),
      });
      if (!res.ok) throw new Error('Error al enviar');
      toast({
        title: "Suscripción exitosa",
        description: "Te has suscrito al boletín de Recomenzar.",
      });
      setNewsletterEmail('');
    } catch {
      toast({
        title: "Error",
        description: "No se pudo procesar tu suscripción.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="mr-3 text-amber-300 h-5 w-5" />
                <span>610 03 01 38</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-amber-300 h-5 w-5" />
                <span>recomenzarong@gmail.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-3 text-amber-300 h-5 w-5" />
                <span>Valencia</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="hover:text-amber-300 transition duration-300"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('quienes-somos')}
                  className="hover:text-amber-300 transition duration-300"
                >
                  Quienes Somos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="hover:text-amber-300 transition duration-300"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('colabora')}
                  className="hover:text-amber-300 transition duration-300"
                >
                  Colabora
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="hover:text-amber-300 transition duration-300"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Síguenos</h3>
            <div className="flex space-x-4">
              
              
              <a href="https://www.instagram.com/fundacionrecomenzar/" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-amber-500 transition duration-300">
                <Instagram size={18} />
              </a>
              
            </div>
            <div className="mt-6">
              <a href="https://www.recomenzar.org" className="text-amber-300 hover:underline" target="_blank" rel="noopener noreferrer">www.recomenzar.org</a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Mantente informado</h3>
            <p className="mb-4">Suscríbete a nuestro boletín para recibir noticias y actualizaciones.</p>
            <form onSubmit={submitNewsletter} className="flex">
              <Input
                type="email"
                placeholder="Tu email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="rounded-l-lg rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800"
              />
              <Button type="submit" className="px-4 py-2 bg-amber-500 rounded-r-lg rounded-l-none hover:bg-amber-600 transition duration-300">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">© 2025 Recomenzar. Todos los derechos reservados.</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-amber-300 transition duration-300">Aviso Legal</a>
            <a href="#" className="hover:text-amber-300 transition duration-300">Política de Privacidad</a>
            <a href="#" className="hover:text-amber-300 transition duration-300">Política de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
