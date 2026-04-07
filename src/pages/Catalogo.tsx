import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CatalogoHeader from '@/components/catalogo/CatalogoHeader';
import CategoryFilter from '@/components/catalogo/CategoryFilter';
import ProductCard from '@/components/catalogo/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { apiGet } from '@/lib/api';
import type { Product, Categoria, PaginatedResponse } from '@/types/catalogo';

type SortOption = 'nombre' | 'precio_asc' | 'precio_desc' | 'reciente';

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Categoria | null>(null);
  const [sort, setSort] = useState<SortOption>('reciente');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('busqueda', search);
        if (category) params.set('categoria', category);
        params.set('limit', '50');
        const res = await apiGet<PaginatedResponse<Product>>(`/catalogo/products?${params}`);
        setProducts(Array.isArray(res.data) ? res.data : Array.isArray(res) ? res as unknown as Product[] : []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category]);

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case 'nombre':
        return list.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'precio_asc':
        return list.sort((a, b) => a.precio - b.precio);
      case 'precio_desc':
        return list.sort((a, b) => b.precio - a.precio);
      case 'reciente':
      default:
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [products, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogoHeader />

      {/* Hero */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-10 px-4">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold font-montserrat"
          >
            Catálogo Solidario
          </motion.h1>
          <p className="mt-2 text-green-200">
            Productos artesanales hechos con amor. Tu compra apoya la reinserción social.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-[60px] z-40">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar productos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sort} onValueChange={v => setSort(v as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reciente">Más recientes</SelectItem>
              <SelectItem value="nombre">Nombre A-Z</SelectItem>
              <SelectItem value="precio_asc">Precio: menor</SelectItem>
              <SelectItem value="precio_desc">Precio: mayor</SelectItem>
            </SelectContent>
          </Select>
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No se encontraron productos</p>
            <p className="text-sm mt-1">Prueba con otros filtros o términos de búsqueda</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sorted.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
