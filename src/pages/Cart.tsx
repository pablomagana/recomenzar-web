import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowRight, ImageIcon, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CatalogoHeader from '@/components/catalogo/CatalogoHeader';
import CheckoutDialog from '@/components/catalogo/CheckoutDialog';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [, navigate] = useLocation();

  const handleSuccess = (referencia: string) => {
    navigate(`/catalogo/pedido-confirmado?ref=${encodeURIComponent(referencia)}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CatalogoHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-400 mb-6">Explora nuestro catálogo y añade productos solidarios</p>
          <Link href="/catalogo">
            <Button className="bg-green-800 hover:bg-green-700">Ver catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogoHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-green-900">
                Tu carrito ({items.reduce((s, i) => s + i.cantidad, 0)} productos)
              </h1>
              <button onClick={clearCart} className="text-sm text-orange-500 hover:underline">
                Vaciar carrito
              </button>
            </div>

            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 bg-white rounded-xl border p-3"
              >
                <div className="h-24 w-24 rounded-lg bg-green-100 flex items-center justify-center shrink-0 overflow-hidden">
                  {item.product.imagenPrincipal ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL ?? ''}${item.product.imagenPrincipal}`}
                      alt={item.product.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-green-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-green-900 truncate">{item.product.nombre}</h3>
                  <p className="text-xs text-gray-400">{item.product.categoria}</p>
                  <p className="font-bold text-green-800 mt-1">€{item.product.precio.toFixed(2)}</p>
                </div>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.cantidad - 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold bg-gray-50 h-9 flex items-center justify-center">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.cantidad + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.product.id)}>
                  <Trash2 className="h-4.5 w-4.5 text-orange-500 hover:text-orange-600" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-[380px]">
            <div className="bg-white rounded-xl border p-6 space-y-4 sticky top-[120px]">
              <h2 className="font-bold text-lg">Resumen del pedido</h2>
              <Separator />
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.product.nombre} (x{item.cantidad})</span>
                  <span>€{(item.product.precio * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-800">€{totalPrice.toFixed(2)}</span>
              </div>
              <Button
                onClick={() => setCheckoutOpen(true)}
                className="w-full bg-green-800 hover:bg-green-700 gap-2"
              >
                Realizar pedido <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
