import { Link } from 'wouter';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

export default function CatalogoHeader() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-green-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/catalogo" className="flex items-center gap-2">
          <Leaf className="h-7 w-7" />
          <span className="text-xl font-bold font-montserrat">Catálogo Solidario</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-green-200 hover:text-white transition text-sm hidden md:block">
            Inicio
          </Link>
          <Link href="/formacion" className="text-green-200 hover:text-white transition text-sm hidden md:block">
            Formación
          </Link>
          <Link href="/catalogo" className="text-white font-bold transition text-sm hidden md:block">
            Catálogo
          </Link>
          <Link href="/catalogo/carrito" className="relative flex items-center gap-1">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 hover:bg-orange-500 text-[11px]">
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
