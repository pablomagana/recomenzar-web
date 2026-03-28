export type Categoria = 'artesania' | 'textil' | 'madera' | 'ceramica' | 'otros';

export type EstadoPedido = 'pendiente' | 'procesando' | 'enviado' | 'completado' | 'cancelado';

export interface ProductImage {
  id: string;
  url: string;
  orden: number;
  productId: string;
  createdAt: string;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  stock: number;
  activo: boolean;
  imagenPrincipal: string | null;
  imagenes?: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  cantidad: number;
}

export interface OrderItem {
  id: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  nombreProducto: string;
  orderId: string;
  productId: string | null;
}

export interface Order {
  id: string;
  referencia: string;
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  provincia: string;
  notas: string | null;
  estado: EstadoPedido;
  total: number;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  provincia: string;
  notas?: string;
  items: { productId: string; cantidad: number }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: 'artesania', label: 'Artesania' },
  { value: 'textil', label: 'Textil' },
  { value: 'madera', label: 'Madera' },
  { value: 'ceramica', label: 'Ceramica' },
  { value: 'otros', label: 'Otros' },
];

export const ESTADOS_PEDIDO: { value: EstadoPedido; label: string }[] = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'procesando', label: 'Procesando' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'completado', label: 'Completado' },
  { value: 'cancelado', label: 'Cancelado' },
];
