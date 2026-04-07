import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, ImageIcon, Eye, RefreshCw, LogOut, Loader2 } from 'lucide-react';
import { apiGet, apiPost, apiPut, apiDelete, apiUpload, apiPatch, setToken, removeToken, isAuthenticated } from '@/lib/api';
import type { Product, Order, PaginatedResponse, Categoria, EstadoPedido } from '@/types/catalogo';
import { CATEGORIAS, ESTADOS_PEDIDO } from '@/types/catalogo';
import CatalogoHeader from '@/components/catalogo/CatalogoHeader';

const loginSchema = z.object({
  email: z.string().email('Email no válido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

const productSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  descripcion: z.string().min(1, 'Descripción requerida'),
  precio: z.coerce.number().min(0, 'Precio inválido'),
  categoria: z.string().min(1, 'Categoría requerida'),
  stock: z.coerce.number().int().min(0, 'Stock inválido'),
});

type LoginForm = z.infer<typeof loginSchema>;
type ProductForm = z.infer<typeof productSchema>;

// ---------- Login ----------
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await apiPost<{ accessToken: string }>('/auth/login', data);
      setToken(res.accessToken);
      onLogin();
    } catch {
      toast({ title: 'Error', description: 'Credenciales incorrectas', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl border p-8 w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-green-900 text-center">Panel Admin</h1>
        <p className="text-sm text-gray-400 text-center">Acceso para administradores del catálogo</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Contraseña</Label>
            <Input type="password" {...register('password')} />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-green-800 hover:bg-green-700">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ---------- Products Tab ----------
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGet<PaginatedResponse<Product>>('/catalogo/products?limit=100');
      setProducts(Array.isArray(res.data) ? res.data : Array.isArray(res) ? res as unknown as Product[] : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const watchedCategoria = watch('categoria');

  const openCreate = () => {
    setEditing(null);
    setImageFile(null);
    setImagePreview(null);
    reset({ nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0 });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setImageFile(null);
    setImagePreview(p.imagenPrincipal ? `${import.meta.env.VITE_API_URL ?? ''}${p.imagenPrincipal}` : null);
    reset({ nombre: p.nombre, descripcion: p.descripcion, precio: p.precio, categoria: p.categoria, stock: p.stock });
    setDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: ProductForm) => {
    setSubmitting(true);
    try {
      let productId: string;
      if (editing) {
        await apiPut(`/catalogo/products/${editing.id}`, data);
        productId = editing.id;
      } else {
        const created = await apiPost<Product>('/catalogo/products', data);
        productId = created.id;
      }
      if (imageFile) {
        const formData = new FormData();
        formData.append('images', imageFile);
        await apiUpload(`/catalogo/products/${productId}/images`, formData);
      }
      toast({ title: editing ? 'Producto actualizado' : 'Producto creado' });
      setDialogOpen(false);
      fetchProducts();
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Error', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDelete(`/catalogo/products/${id}`);
      toast({ title: 'Producto eliminado' });
      fetchProducts();
    } catch {
      toast({ title: 'Error al eliminar', variant: 'destructive' });
    }
  };

  const handleImageUpload = async (productId: string, files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('images', f));
    try {
      await apiUpload(`/catalogo/products/${productId}/images`, formData);
      toast({ title: 'Imágenes subidas' });
      fetchProducts();
    } catch {
      toast({ title: 'Error al subir imágenes', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Productos ({products.length})</h2>
        <Button onClick={openCreate} className="bg-green-800 hover:bg-green-700 gap-2">
          <Plus className="h-4 w-4" /> Nuevo producto
        </Button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Img</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-28">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">Cargando...</TableCell></TableRow>
            ) : products.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">Sin productos</TableCell></TableRow>
            ) : products.map(p => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="h-10 w-12 rounded bg-green-100 flex items-center justify-center overflow-hidden">
                    {p.imagenPrincipal ? (
                      <img src={`${import.meta.env.VITE_API_URL ?? ''}${p.imagenPrincipal}`} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-green-300" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{p.nombre}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    {CATEGORIAS.find(c => c.value === p.categoria)?.label ?? p.categoria}
                  </Badge>
                </TableCell>
                <TableCell>€{Number(p.precio).toFixed(2)}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Badge className={p.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-green-600 hover:text-green-800">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-orange-500 hover:text-orange-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
                      <ImageIcon className="h-4 w-4" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files && handleImageUpload(p.id, e.target.files)}
                      />
                    </label>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar producto' : 'Nuevo producto'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input {...register('nombre')} />
              {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre.message}</p>}
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea {...register('descripcion')} />
              {errors.descripcion && <p className="text-xs text-red-500 mt-1">{errors.descripcion.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Precio (€)</Label>
                <Input type="number" step="0.01" {...register('precio')} />
                {errors.precio && <p className="text-xs text-red-500 mt-1">{errors.precio.message}</p>}
              </div>
              <div>
                <Label>Stock</Label>
                <Input type="number" {...register('stock')} />
                {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>}
              </div>
              <div>
                <Label>Categoría</Label>
                <Select value={watchedCategoria || undefined} onValueChange={v => setValue('categoria', v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoria && <p className="text-xs text-red-500 mt-1">{errors.categoria.message}</p>}
              </div>
            </div>
            <div>
              <Label>Imagen</Label>
              <div className="mt-1 flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative h-20 w-24 rounded-lg overflow-hidden bg-green-100 shrink-0">
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(editing?.imagenPrincipal ? `${import.meta.env.VITE_API_URL ?? ''}${editing.imagenPrincipal}` : null); }}
                      className="absolute top-0.5 right-0.5 bg-white/80 rounded-full p-0.5 hover:bg-white"
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="h-20 w-24 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <ImageIcon className="h-6 w-6 text-green-300" />
                  </div>
                )}
                <label className="cursor-pointer">
                  <div className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 transition inline-flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    {imagePreview ? 'Cambiar imagen' : 'Subir imagen'}
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-green-800 hover:bg-green-700">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? 'Guardar cambios' : 'Crear producto'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Orders Tab ----------
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Order | null>(null);
  const { toast } = useToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGet<PaginatedResponse<Order>>('/catalogo/orders?limit=100');
      setOrders(Array.isArray(res.data) ? res.data : Array.isArray(res) ? res as unknown as Order[] : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (id: string, estado: EstadoPedido) => {
    try {
      await apiPatch(`/catalogo/orders/${id}/estado`, { estado });
      toast({ title: `Estado actualizado a "${estado}"` });
      fetchOrders();
    } catch {
      toast({ title: 'Error al actualizar', variant: 'destructive' });
    }
  };

  const estadoColor: Record<EstadoPedido, string> = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    procesando: 'bg-blue-100 text-blue-800',
    enviado: 'bg-green-100 text-green-800',
    completado: 'bg-emerald-100 text-emerald-800',
    cancelado: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Pedidos ({orders.length})</h2>
        <Button variant="outline" onClick={fetchOrders} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Actualizar
        </Button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Referencia</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-400">Cargando...</TableCell></TableRow>
            ) : orders.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-400">Sin pedidos</TableCell></TableRow>
            ) : orders.map(o => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-sm font-bold text-green-800">{o.referencia}</TableCell>
                <TableCell>{o.nombreCliente}</TableCell>
                <TableCell className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString('es-ES')}</TableCell>
                <TableCell className="font-bold">€{Number(o.total).toFixed(2)}</TableCell>
                <TableCell>
                  <Select value={o.estado} onValueChange={v => updateStatus(o.id, v as EstadoPedido)}>
                    <SelectTrigger className="h-8 w-32">
                      <Badge className={estadoColor[o.estado]}>
                        {ESTADOS_PEDIDO.find(e => e.value === o.estado)?.label}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      {ESTADOS_PEDIDO.map(e => (
                        <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <button onClick={() => setDetail(o)} className="text-green-600 hover:text-green-800">
                    <Eye className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pedido {detail?.referencia}</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-gray-400">Cliente:</span> {detail.nombreCliente}</div>
                <div><span className="text-gray-400">Email:</span> {detail.emailCliente}</div>
                <div><span className="text-gray-400">Teléfono:</span> {detail.telefonoCliente}</div>
                <div><span className="text-gray-400">Ciudad:</span> {detail.ciudad}</div>
                <div className="col-span-2"><span className="text-gray-400">Dirección:</span> {detail.direccion}, {detail.codigoPostal} {detail.provincia}</div>
                {detail.notas && <div className="col-span-2"><span className="text-gray-400">Notas:</span> {detail.notas}</div>}
              </div>
              {detail.items && detail.items.length > 0 && (
                <>
                  <h4 className="font-bold mt-2">Artículos</h4>
                  {detail.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.nombreProducto} x{item.cantidad}</span>
                      <span>€{Number(item.subtotal).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>€{Number(detail.total).toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Main ----------
export default function CatalogoAdmin() {
  const [authed, setAuthed] = useState(isAuthenticated());

  const handleLogout = () => {
    removeToken();
    setAuthed(false);
  };

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogoHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-900">Panel de Administración</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </Button>
        </div>

        <Tabs defaultValue="productos">
          <TabsList>
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          </TabsList>
          <TabsContent value="productos" className="mt-4">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="pedidos" className="mt-4">
            <OrdersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
