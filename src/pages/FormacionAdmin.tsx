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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, ImageIcon, LogOut, Loader2, ExternalLink, GraduationCap, ChevronUp, ChevronDown } from 'lucide-react';
import { apiGet, apiPost, apiPut, apiDelete, apiUpload, setToken, setRefreshToken, removeToken, isAuthenticated } from '@/lib/api';
import type { Empresa, Curso, Faq } from '@/types/formacion';
import { MODALIDADES, NIVELES, AREAS } from '@/types/formacion';
import type { PaginatedResponse } from '@/types/catalogo';
import { Link } from 'wouter';

const loginSchema = z.object({
  email: z.string().email('Email no válido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

type LoginForm = z.infer<typeof loginSchema>;

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
      const res = await apiPost<{ accessToken: string; refreshToken: string }>('/auth/login', data);
      setToken(res.accessToken);
      setRefreshToken(res.refreshToken);
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
        <h1 className="text-2xl font-bold text-green-900 text-center">Panel de Formación</h1>
        <p className="text-sm text-gray-400 text-center">Acceso para administradores</p>
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

// ---------- Empresas Tab ----------
const empresaSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  descripcion: z.string().min(1, 'Descripción requerida'),
  certificado: z.boolean(),
  contactoEmail: z.string().email('Email no válido').or(z.literal('')).optional(),
  contactoTelefono: z.string().optional(),
});
type EmpresaForm = z.infer<typeof empresaSchema>;

function EmpresasTab() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Empresa | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchEmpresas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGet<PaginatedResponse<Empresa>>('/formacion/empresas?limit=100');
      setEmpresas(Array.isArray(res.data) ? res.data : []);
    } catch {
      setEmpresas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmpresas(); }, [fetchEmpresas]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<EmpresaForm>({
    resolver: zodResolver(empresaSchema),
    defaultValues: { certificado: false },
  });

  const watchedCertificado = watch('certificado');

  const openCreate = () => {
    setEditing(null);
    reset({ nombre: '', descripcion: '', certificado: false, contactoEmail: '', contactoTelefono: '' });
    setDialogOpen(true);
  };

  const openEdit = (e: Empresa) => {
    setEditing(e);
    reset({
      nombre: e.nombre,
      descripcion: e.descripcion,
      certificado: e.certificado,
      contactoEmail: e.contactoEmail ?? '',
      contactoTelefono: e.contactoTelefono ?? '',
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: EmpresaForm) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        contactoEmail: data.contactoEmail || undefined,
        contactoTelefono: data.contactoTelefono || undefined,
      };
      if (editing) {
        await apiPut(`/formacion/empresas/${editing.id}`, payload);
      } else {
        await apiPost('/formacion/empresas', payload);
      }
      toast({ title: editing ? 'Empresa actualizada' : 'Empresa creada' });
      setDialogOpen(false);
      fetchEmpresas();
    } catch (err) {
      toast({ title: 'Error al guardar', description: err instanceof Error ? err.message : 'Error', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDelete(`/formacion/empresas/${id}`);
      toast({ title: 'Empresa eliminada' });
      fetchEmpresas();
    } catch {
      toast({ title: 'Error al eliminar', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Empresas ({empresas.length})</h2>
        <Button onClick={openCreate} className="bg-green-800 hover:bg-green-700 gap-2">
          <Plus className="h-4 w-4" /> Nueva empresa
        </Button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Certificado</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">Cargando...</TableCell></TableRow>
            ) : empresas.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">Sin empresas</TableCell></TableRow>
            ) : empresas.map(e => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.nombre}</TableCell>
                <TableCell className="max-w-[200px] truncate text-sm text-gray-500">{e.descripcion}</TableCell>
                <TableCell>
                  {e.certificado ? <Badge className="bg-green-100 text-green-800">Si</Badge> : <Badge variant="secondary">No</Badge>}
                </TableCell>
                <TableCell className="text-sm text-gray-500">{e.contactoEmail ?? '-'}</TableCell>
                <TableCell className="text-sm text-gray-500">{e.contactoTelefono ?? '-'}</TableCell>
                <TableCell>
                  <Badge className={e.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {e.activo ? 'Activa' : 'Inactiva'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(e)} className="text-green-600 hover:text-green-800"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(e.id)} className="text-orange-500 hover:text-orange-600"><Trash2 className="h-4 w-4" /></button>
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
            <DialogTitle>{editing ? 'Editar empresa' : 'Nueva empresa'}</DialogTitle>
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Email de contacto</Label>
                <Input type="email" {...register('contactoEmail')} />
                {errors.contactoEmail && <p className="text-xs text-red-500 mt-1">{errors.contactoEmail.message}</p>}
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input {...register('contactoTelefono')} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={watchedCertificado} onCheckedChange={v => setValue('certificado', v)} />
              <Label>Centro certificado</Label>
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-green-800 hover:bg-green-700">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? 'Guardar cambios' : 'Crear empresa'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Cursos Tab ----------
const cursoSchema = z.object({
  titulo: z.string().min(1, 'Título requerido'),
  descripcion: z.string().min(1, 'Descripción requerida'),
  duracion: z.string().min(1, 'Duración requerida'),
  modalidad: z.string().min(1, 'Modalidad requerida'),
  certificacion: z.string().min(1, 'Certificación requerida'),
  nivel: z.string().min(1, 'Nivel requerido'),
  area: z.string().min(1, 'Área requerida'),
  becaDisponible: z.boolean(),
  recomendado: z.boolean(),
  empresaId: z.string().optional(),
});
type CursoForm = z.infer<typeof cursoSchema>;

function CursosTab() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Curso | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchCursos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGet<PaginatedResponse<Curso>>('/formacion/cursos?limit=100');
      setCursos(Array.isArray(res.data) ? res.data : []);
    } catch {
      setCursos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEmpresas = useCallback(async () => {
    try {
      const res = await apiGet<PaginatedResponse<Empresa>>('/formacion/empresas?limit=100');
      setEmpresas(Array.isArray(res.data) ? res.data : []);
    } catch {
      setEmpresas([]);
    }
  }, []);

  useEffect(() => { fetchCursos(); fetchEmpresas(); }, [fetchCursos, fetchEmpresas]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CursoForm>({
    resolver: zodResolver(cursoSchema),
    defaultValues: { becaDisponible: false, recomendado: false },
  });

  const watchedModalidad = watch('modalidad');
  const watchedNivel = watch('nivel');
  const watchedArea = watch('area');
  const watchedEmpresaId = watch('empresaId');
  const watchedBeca = watch('becaDisponible');
  const watchedRecomendado = watch('recomendado');

  const openCreate = () => {
    setEditing(null);
    setImageFile(null);
    setImagePreview(null);
    reset({ titulo: '', descripcion: '', duracion: '', modalidad: '', certificacion: '', nivel: '', area: '', becaDisponible: false, recomendado: false, empresaId: '' });
    setDialogOpen(true);
  };

  const openEdit = (c: Curso) => {
    setEditing(c);
    setImageFile(null);
    setImagePreview(c.imagenPrincipal ? `${import.meta.env.VITE_API_URL ?? ''}${c.imagenPrincipal}` : null);
    reset({
      titulo: c.titulo,
      descripcion: c.descripcion,
      duracion: c.duracion,
      modalidad: c.modalidad,
      certificacion: c.certificacion,
      nivel: c.nivel,
      area: c.area,
      becaDisponible: c.becaDisponible,
      recomendado: c.recomendado,
      empresaId: c.empresaId ?? '',
    });
    setDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: CursoForm) => {
    setSubmitting(true);
    try {
      const payload = { ...data, empresaId: data.empresaId || undefined };
      let cursoId: string;
      if (editing) {
        await apiPut(`/formacion/cursos/${editing.id}`, payload);
        cursoId = editing.id;
      } else {
        const created = await apiPost<Curso>('/formacion/cursos', payload);
        cursoId = created.id;
      }
      if (imageFile) {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        await apiUpload(`/formacion/cursos/${cursoId}/imagen`, formData);
      }
      toast({ title: editing ? 'Curso actualizado' : 'Curso creado' });
      setDialogOpen(false);
      fetchCursos();
    } catch (err) {
      toast({ title: 'Error al guardar', description: err instanceof Error ? err.message : 'Error', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDelete(`/formacion/cursos/${id}`);
      toast({ title: 'Curso eliminado' });
      fetchCursos();
    } catch {
      toast({ title: 'Error al eliminar', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Cursos ({cursos.length})</h2>
        <Button onClick={openCreate} className="bg-green-800 hover:bg-green-700 gap-2">
          <Plus className="h-4 w-4" /> Nuevo curso
        </Button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Img</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Modalidad</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Beca</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={9} className="text-center py-8 text-gray-400">Cargando...</TableCell></TableRow>
            ) : cursos.length === 0 ? (
              <TableRow><TableCell colSpan={9} className="text-center py-8 text-gray-400">Sin cursos</TableCell></TableRow>
            ) : cursos.map(c => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="h-10 w-12 rounded bg-green-100 flex items-center justify-center overflow-hidden">
                    {c.imagenPrincipal ? (
                      <img src={`${import.meta.env.VITE_API_URL ?? ''}${c.imagenPrincipal}`} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-green-300" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{c.titulo}</TableCell>
                <TableCell className="text-sm text-gray-500">{c.empresa?.nombre ?? '-'}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{AREAS.find(a => a.value === c.area)?.label ?? c.area}</Badge></TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{MODALIDADES.find(m => m.value === c.modalidad)?.label ?? c.modalidad}</Badge></TableCell>
                <TableCell className="text-sm">{NIVELES.find(n => n.value === c.nivel)?.label ?? c.nivel}</TableCell>
                <TableCell>{c.becaDisponible ? <Badge className="bg-green-100 text-green-800 text-xs">Si</Badge> : '-'}</TableCell>
                <TableCell>
                  <Badge className={c.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {c.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(c)} className="text-green-600 hover:text-green-800"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(c.id)} className="text-orange-500 hover:text-orange-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar curso' : 'Nuevo curso'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input {...register('titulo')} />
              {errors.titulo && <p className="text-xs text-red-500 mt-1">{errors.titulo.message}</p>}
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea {...register('descripcion')} />
              {errors.descripcion && <p className="text-xs text-red-500 mt-1">{errors.descripcion.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Duración</Label>
                <Input {...register('duracion')} placeholder="Ej: 120 horas (3 meses)" />
                {errors.duracion && <p className="text-xs text-red-500 mt-1">{errors.duracion.message}</p>}
              </div>
              <div>
                <Label>Certificación</Label>
                <Input {...register('certificacion')} />
                {errors.certificacion && <p className="text-xs text-red-500 mt-1">{errors.certificacion.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Modalidad</Label>
                <Select value={watchedModalidad || undefined} onValueChange={v => setValue('modalidad', v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {MODALIDADES.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.modalidad && <p className="text-xs text-red-500 mt-1">{errors.modalidad.message}</p>}
              </div>
              <div>
                <Label>Nivel</Label>
                <Select value={watchedNivel || undefined} onValueChange={v => setValue('nivel', v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {NIVELES.map(n => <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.nivel && <p className="text-xs text-red-500 mt-1">{errors.nivel.message}</p>}
              </div>
              <div>
                <Label>Área formativa</Label>
                <Select value={watchedArea || undefined} onValueChange={v => setValue('area', v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {AREAS.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area.message}</p>}
              </div>
            </div>
            <div>
              <Label>Empresa colaboradora</Label>
              <Select value={watchedEmpresaId || undefined} onValueChange={v => setValue('empresaId', v)}>
                <SelectTrigger><SelectValue placeholder="Sin empresa" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Sin empresa</SelectItem>
                  {empresas.map(e => <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <Switch checked={watchedBeca} onCheckedChange={v => setValue('becaDisponible', v)} />
                <Label>Beca disponible</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={watchedRecomendado} onCheckedChange={v => setValue('recomendado', v)} />
                <Label>Recomendado</Label>
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
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? 'Guardar cambios' : 'Crear curso'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- FAQs Tab ----------
const faqSchema = z.object({
  pregunta: z.string().min(1, 'Pregunta requerida'),
  respuesta: z.string().min(1, 'Respuesta requerida'),
});
type FaqForm = z.infer<typeof faqSchema>;

function FaqsTab() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGet<Faq[]>('/formacion/faqs/admin');
      setFaqs(Array.isArray(res) ? res : []);
    } catch {
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFaqs(); }, [fetchFaqs]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FaqForm>({
    resolver: zodResolver(faqSchema),
  });

  const openCreate = () => {
    setEditing(null);
    reset({ pregunta: '', respuesta: '' });
    setDialogOpen(true);
  };

  const openEdit = (f: Faq) => {
    setEditing(f);
    reset({ pregunta: f.pregunta, respuesta: f.respuesta });
    setDialogOpen(true);
  };

  const onSubmit = async (data: FaqForm) => {
    setSubmitting(true);
    try {
      if (editing) {
        await apiPut(`/formacion/faqs/${editing.id}`, data);
      } else {
        await apiPost('/formacion/faqs', data);
      }
      toast({ title: editing ? 'FAQ actualizada' : 'FAQ creada' });
      setDialogOpen(false);
      fetchFaqs();
    } catch (err) {
      toast({ title: 'Error al guardar', description: err instanceof Error ? err.message : 'Error', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDelete(`/formacion/faqs/${id}`);
      toast({ title: 'FAQ eliminada' });
      fetchFaqs();
    } catch {
      toast({ title: 'Error al eliminar', variant: 'destructive' });
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newFaqs = [...faqs];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newFaqs.length) return;
    [newFaqs[index], newFaqs[swapIndex]] = [newFaqs[swapIndex], newFaqs[index]];
    setFaqs(newFaqs);
    try {
      await apiPut('/formacion/faqs/reorder', { ids: newFaqs.map(f => f.id) });
    } catch {
      toast({ title: 'Error al reordenar', variant: 'destructive' });
      fetchFaqs();
    }
  };

  const toggleActivo = async (faq: Faq) => {
    try {
      await apiPut(`/formacion/faqs/${faq.id}`, { activo: !faq.activo });
      fetchFaqs();
    } catch {
      toast({ title: 'Error al actualizar', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">FAQs ({faqs.length})</h2>
        <Button onClick={openCreate} className="bg-green-800 hover:bg-green-700 gap-2">
          <Plus className="h-4 w-4" /> Nueva FAQ
        </Button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Orden</TableHead>
              <TableHead>Pregunta</TableHead>
              <TableHead className="max-w-[300px]">Respuesta</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-32">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">Cargando...</TableCell></TableRow>
            ) : faqs.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">Sin FAQs</TableCell></TableRow>
            ) : faqs.map((f, i) => (
              <TableRow key={f.id}>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    <button onClick={() => handleMove(i, 'up')} disabled={i === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-25">
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-gray-400">{f.orden}</span>
                    <button onClick={() => handleMove(i, 'down')} disabled={i === faqs.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-25">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{f.pregunta}</TableCell>
                <TableCell className="max-w-[300px] truncate text-sm text-gray-500">{f.respuesta}</TableCell>
                <TableCell>
                  <button onClick={() => toggleActivo(f)}>
                    <Badge className={f.activo ? 'bg-green-100 text-green-800 cursor-pointer' : 'bg-red-100 text-red-800 cursor-pointer'}>
                      {f.activo ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(f)} className="text-green-600 hover:text-green-800"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(f.id)} className="text-orange-500 hover:text-orange-600"><Trash2 className="h-4 w-4" /></button>
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
            <DialogTitle>{editing ? 'Editar FAQ' : 'Nueva FAQ'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Pregunta</Label>
              <Input {...register('pregunta')} />
              {errors.pregunta && <p className="text-xs text-red-500 mt-1">{errors.pregunta.message}</p>}
            </div>
            <div>
              <Label>Respuesta</Label>
              <Textarea rows={4} {...register('respuesta')} />
              {errors.respuesta && <p className="text-xs text-red-500 mt-1">{errors.respuesta.message}</p>}
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-green-800 hover:bg-green-700">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? 'Guardar cambios' : 'Crear FAQ'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Main ----------
export default function FormacionAdmin() {
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
      <header className="sticky top-0 z-50 bg-green-800 text-white shadow-md">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/formacion" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7" />
            <span className="text-xl font-bold font-montserrat">Formación</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-green-200 hover:text-white transition hidden md:block">Inicio</Link>
            <Link href="/formacion" className="text-green-200 hover:text-white transition hidden md:block">Portal</Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-900">Gestión de Formación</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open('/formacion', '_blank')} className="gap-2">
              <ExternalLink className="h-4 w-4" /> Ver portal
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </Button>
          </div>
        </div>

        <Tabs defaultValue="cursos">
          <TabsList>
            <TabsTrigger value="cursos">Cursos</TabsTrigger>
            <TabsTrigger value="empresas">Empresas</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="cursos" className="mt-4">
            <CursosTab />
          </TabsContent>
          <TabsContent value="empresas" className="mt-4">
            <EmpresasTab />
          </TabsContent>
          <TabsContent value="faqs" className="mt-4">
            <FaqsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
