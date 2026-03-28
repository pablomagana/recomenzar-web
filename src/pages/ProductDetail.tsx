import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, Truck, Heart, Minus, Plus, ImageIcon, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import CatalogoHeader from '@/components/catalogo/CatalogoHeader';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { apiGet } from '@/lib/api';
import type { Product } from '@/types/catalogo';
import { CATEGORIAS } from '@/types/catalogo';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await apiGet<Product>(`/catalogo/products/${id}`);
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;
    addItem(product, cantidad);
    toast({ title: 'Añadido al carrito', description: `${cantidad}x ${product.nombre}` });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CatalogoHeader />
        <div className="container mx-auto px-4 py-10 flex gap-10">
          <Skeleton className="w-[600px] h-[450px] rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CatalogoHeader />
        <div className="container mx-auto px-4 py-20 text-center text-gray-400">
          <p className="text-xl">Producto no encontrado</p>
          <Link href="/catalogo">
            <Button variant="outline" className="mt-4">Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  const catLabel = CATEGORIAS.find(c => c.value === product.categoria)?.label ?? product.categoria;
  const images = product.imagenes?.length ? product.imagenes : [];
  const mainImageUrl = images[selectedImage]?.url
    ? `${import.meta.env.VITE_API_URL ?? ''}${images[selectedImage].url}`
    : product.imagenPrincipal
      ? `${import.meta.env.VITE_API_URL ?? ''}${product.imagenPrincipal}`
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogoHeader />
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/catalogo" className="text-green-600 hover:underline flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />Catálogo
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{catLabel}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">{product.nombre}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-[600px] space-y-3">
            <div className="h-[450px] rounded-xl bg-green-100 flex items-center justify-center overflow-hidden">
              {mainImageUrl ? (
                <img src={mainImageUrl} alt={product.nombre} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="h-16 w-16 text-green-300" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-16 rounded-lg bg-green-100 overflow-hidden border-2 ${i === selectedImage ? 'border-green-800' : 'border-transparent'}`}
                  >
                    <img src={`${import.meta.env.VITE_API_URL ?? ''}${img.url}`} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-5">
            <h1 className="text-3xl font-bold text-green-900 font-montserrat">{product.nombre}</h1>
            <Badge className="bg-green-100 text-green-800">{catLabel}</Badge>
            <p className="text-3xl font-bold text-green-800">€{product.precio.toFixed(2)}</p>
            <Separator />
            <p className="text-gray-600 leading-relaxed">{product.descripcion}</p>

            {product.stock > 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">En stock ({product.stock} disponibles)</span>
              </div>
            ) : (
              <p className="text-red-500 text-sm font-medium">Agotado</p>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">Cantidad:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-bold bg-gray-50 h-10 flex items-center justify-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(Math.min(product.stock, cantidad + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full bg-green-800 hover:bg-green-700 gap-2 text-base"
            >
              <ShoppingCart className="h-5 w-5" />
              Añadir al carrito
            </Button>

            <Separator />
            <div className="flex gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4" />Envío a toda España</span>
              <span className="flex items-center gap-2"><Heart className="h-4 w-4" />Compra solidaria</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
