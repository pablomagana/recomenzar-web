import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CatalogoHeader from '@/components/catalogo/CatalogoHeader';

export default function OrderConfirmed() {
  const params = new URLSearchParams(window.location.search);
  const referencia = params.get('ref') || 'REC-XXXXXXXX-XXXX';

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogoHeader />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
        >
          <Check className="h-10 w-10 text-green-800" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-green-900 mb-2"
        >
          ¡Pedido realizado con éxito!
        </motion.h1>
        <p className="text-gray-500 mb-8">
          Gracias por tu compra solidaria. Hemos enviado los detalles a tu email.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border p-6 w-full max-w-md space-y-4"
        >
          <p className="text-sm text-gray-400">Referencia del pedido</p>
          <p className="text-2xl font-bold text-green-800 font-mono">{referencia}</p>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estado</span>
            <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
          </div>
        </motion.div>

        <div className="flex gap-4 mt-8">
          <Link href="/catalogo">
            <Button variant="outline" className="border-green-800 text-green-800 hover:bg-green-50">
              Volver al catálogo
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-green-800 hover:bg-green-700">
              Ir al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
