import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { scrollToSection as scrollTo } from '@/lib/utils';
import logoPath from '../../assets/logo-transparent-png.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = useCallback((sectionId: string) => {
    scrollTo(sectionId);
    setIsMenuOpen(false);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-md'}`}>
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto justify-between">
          <div className="flex flex-col items-center">
            {/* Logo and name */}
            <div className="flex items-center">
              <div className="h-12 w-12 mr-2">
                <img src={logoPath} alt="Logo Recomenzar" className="h-full w-auto" />
              </div>
              <span className="text-2xl font-bold text-green-800 font-montserrat">Recomenzar</span>
            </div>
            {/* Eslogan */}
            <div className="text-sm italic text-gray-700 mt-1">
              Cuando el amor sana, la vida renace — <span className="not-italic text-[10px] text-gray-400">since november 2025</span>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Espacio vacío para mantener el layout */}
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Menu */}
        <div className={`hidden md:flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-4`}>
          <button onClick={() => scrollToSection('inicio')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Inicio</button>
          <button onClick={() => scrollToSection('quienes-somos')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Quienes Somos</button>
          <button onClick={() => scrollToSection('servicios')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Servicios</button>
          <Link href="/formacion" className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Formación</Link>
          <button onClick={() => scrollToSection('colabora')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Colabora</button>
          <button onClick={() => scrollToSection('contacto')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Contacto</button>
          <button onClick={() => scrollToSection('alta')} className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-300 ml-2">Darse de Alta</button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden w-full transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-2 pb-4">
            <button onClick={() => scrollToSection('inicio')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Inicio</button>
            <button onClick={() => scrollToSection('quienes-somos')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Quienes Somos</button>
            <button onClick={() => scrollToSection('servicios')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Servicios</button>
            <Link href="/formacion" className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Formación</Link>
            <button onClick={() => scrollToSection('colabora')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Colabora</button>
            <button onClick={() => scrollToSection('contacto')} className="px-3 py-2 text-green-800 hover:text-orange-600 font-medium transition duration-300">Contacto</button>
            <button onClick={() => scrollToSection('alta')} className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-300">Darse de Alta</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
