export type Modalidad = 'presencial' | 'online' | 'hibrido';

export type NivelCurso = 'basico' | 'inicial' | 'tecnico' | 'avanzado';

export type AreaFormativa = 'oficios' | 'tecnologia' | 'servicios';

export interface Empresa {
  id: string;
  nombre: string;
  descripcion: string;
  certificado: boolean;
  contactoEmail: string | null;
  contactoTelefono: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  modalidad: Modalidad;
  certificacion: string;
  nivel: NivelCurso;
  becaDisponible: boolean;
  recomendado: boolean;
  area: AreaFormativa;
  activo: boolean;
  imagenPrincipal: string | null;
  empresaId: string | null;
  empresa?: Empresa;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: string;
  pregunta: string;
  respuesta: string;
  orden: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export const MODALIDADES: { value: Modalidad; label: string }[] = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'online', label: 'Online' },
  { value: 'hibrido', label: 'Híbrido' },
];

export const NIVELES: { value: NivelCurso; label: string }[] = [
  { value: 'basico', label: 'Básico' },
  { value: 'inicial', label: 'Inicial' },
  { value: 'tecnico', label: 'Técnico' },
  { value: 'avanzado', label: 'Avanzado' },
];

export const AREAS: { value: AreaFormativa; label: string }[] = [
  { value: 'oficios', label: 'Oficios Tradicionales' },
  { value: 'tecnologia', label: 'Tecnología y Digital' },
  { value: 'servicios', label: 'Servicios Personales' },
];
