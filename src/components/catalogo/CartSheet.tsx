import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'wouter';

export default function CartSheet() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center">
          <ShoppingCart className="h-5 w-5 text-white" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 hover:bg-orange-500 text-[11px]">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-[380px] sm:w-[420px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrito ({totalItems})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Tu carrito está vacío
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <div className="h-16 w-16 rounded-lg bg-green-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.nombre}</p>
                    <p className="text-sm text-green-800 font-bold">€{item.product.precio.toFixed(2)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.cantidad - 1)}
                        className="h-6 w-6 flex items-center justify-center rounded border"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.cantidad + 1)}
                        className="h-6 w-6 flex items-center justify-center rounded border"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)}>
                    <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
            <Separator />
            <div className="py-4 space-y-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-800">€{totalPrice.toFixed(2)}</span>
              </div>
              <Link href="/catalogo/carrito">
                <Button className="w-full bg-green-800 hover:bg-green-700">
                  Ver carrito completo
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
