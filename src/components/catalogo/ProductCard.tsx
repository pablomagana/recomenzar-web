import { Link } from 'wouter';
import { ShoppingCart, ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/types/catalogo';
import { CATEGORIAS } from '@/types/catalogo';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const catLabel = CATEGORIAS.find(c => c.value === product.categoria)?.label ?? product.categoria;
  const imgUrl = product.imagenPrincipal
    ? `${import.meta.env.VITE_API_URL ?? ''}${product.imagenPrincipal}`
    : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addItem(product);
    toast({ title: 'Añadido al carrito', description: product.nombre });
  };

  return (
    <Link href={`/catalogo/producto/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative h-48 bg-green-100 flex items-center justify-center">
          {imgUrl ? (
            <img src={imgUrl} alt={product.nombre} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10 text-green-300" />
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-1 gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-green-900 line-clamp-1">{product.nombre}</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-800 shrink-0 text-xs">
              {catLabel}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{product.descripcion}</p>
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-lg font-bold text-green-800">
              €{Number(product.precio).toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className="bg-green-800 hover:bg-green-700 gap-1.5"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {product.stock > 0 ? 'Añadir' : 'Agotado'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
