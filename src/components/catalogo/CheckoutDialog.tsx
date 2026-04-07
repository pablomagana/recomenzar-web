import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Lock, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { apiPost } from '@/lib/api';
import type { Order, CreateOrderData } from '@/types/catalogo';

const checkoutSchema = z.object({
  nombreCliente: z.string().min(2, 'Nombre requerido'),
  emailCliente: z.string().email('Email no válido'),
  telefonoCliente: z.string().min(9, 'Teléfono requerido'),
  direccion: z.string().min(5, 'Dirección requerida'),
  ciudad: z.string().min(2, 'Ciudad requerida'),
  codigoPostal: z.string().min(4, 'Código postal requerido'),
  provincia: z.string().min(2, 'Provincia requerida'),
  notas: z.string().optional(),
  aceptaPrivacidad: z.literal(true, { errorMap: () => ({ message: 'Debes aceptar la política de privacidad' }) }),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (referencia: string) => void;
}

export default function CheckoutDialog({ open, onOpenChange, onSuccess }: CheckoutDialogProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true);
    setError(null);
    try {
      const orderData: CreateOrderData = {
        ...data,
        items: items.map(i => ({ productId: i.product.id, cantidad: i.cantidad })),
      };
      const order = await apiPost<Order>('/catalogo/orders', orderData);
      clearCart();
      onOpenChange(false);
      onSuccess(order.referencia);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Finalizar pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <h3 className="font-bold text-green-900">Datos de envío</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Nombre completo *</Label>
                <Input {...register('nombreCliente')} placeholder="Juan García López" />
                {errors.nombreCliente && <p className="text-xs text-red-500 mt-1">{errors.nombreCliente.message}</p>}
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" {...register('emailCliente')} placeholder="juan@email.com" />
                {errors.emailCliente && <p className="text-xs text-red-500 mt-1">{errors.emailCliente.message}</p>}
              </div>
              <div>
                <Label>Teléfono *</Label>
                <Input {...register('telefonoCliente')} placeholder="612 345 678" />
                {errors.telefonoCliente && <p className="text-xs text-red-500 mt-1">{errors.telefonoCliente.message}</p>}
              </div>
              <div>
                <Label>Dirección *</Label>
                <Input {...register('direccion')} placeholder="Calle Mayor 15, 2ºB" />
                {errors.direccion && <p className="text-xs text-red-500 mt-1">{errors.direccion.message}</p>}
              </div>
              <div>
                <Label>Ciudad *</Label>
                <Input {...register('ciudad')} placeholder="Valencia" />
                {errors.ciudad && <p className="text-xs text-red-500 mt-1">{errors.ciudad.message}</p>}
              </div>
              <div>
                <Label>Código Postal *</Label>
                <Input {...register('codigoPostal')} placeholder="46001" />
                {errors.codigoPostal && <p className="text-xs text-red-500 mt-1">{errors.codigoPostal.message}</p>}
              </div>
              <div>
                <Label>Provincia *</Label>
                <Input {...register('provincia')} placeholder="Valencia" />
                {errors.provincia && <p className="text-xs text-red-500 mt-1">{errors.provincia.message}</p>}
              </div>
            </div>
            <div>
              <Label>Notas (opcional)</Label>
              <Textarea {...register('notas')} placeholder="Instrucciones de entrega..." />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="aceptaPrivacidad"
                {...register('aceptaPrivacidad')}
                onCheckedChange={(checked) => {
                  const event = { target: { name: 'aceptaPrivacidad', value: checked === true } };
                  register('aceptaPrivacidad').onChange(event);
                }}
              />
              <label htmlFor="aceptaPrivacidad" className="text-xs text-gray-600 leading-tight">
                He leído y acepto la{' '}
                <a href="/privacidad" target="_blank" className="text-green-700 underline">Política de Privacidad</a>
                {' '}y autorizo el tratamiento de mis datos para gestionar este pedido. *
              </label>
            </div>
            {errors.aceptaPrivacidad && <p className="text-xs text-red-500">{errors.aceptaPrivacidad.message}</p>}
          </div>

          <div className="w-full md:w-64 bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-bold">Resumen</h3>
            <Separator />
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.product.nombre} x{item.cantidad}</span>
                <span>€{(Number(item.product.precio) * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-800">€{totalPrice.toFixed(2)}</span>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-800 hover:bg-green-700 gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              Confirmar pedido
            </Button>
            <p className="text-xs text-gray-400">
              Al confirmar, recibirás un email con los detalles de tu pedido.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
