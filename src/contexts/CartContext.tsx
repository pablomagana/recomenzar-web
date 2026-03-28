import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CartItem, Product } from '@/types/catalogo';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; cantidad: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; cantidad: number }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, cantidad?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, cantidad: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'recomenzar_cart';

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        const newCantidad = Math.min(existing.cantidad + action.cantidad, action.product.stock);
        return {
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, cantidad: newCantidad }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, cantidad: action.cantidad }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(i => i.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY': {
      if (action.cantidad <= 0) {
        return { items: state.items.filter(i => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map(i =>
          i.product.id === action.productId
            ? { ...i, cantidad: Math.min(action.cantidad, i.product.stock) }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: loadCart() });

  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.precio * i.cantidad, 0);

  const addItem = (product: Product, cantidad = 1) =>
    dispatch({ type: 'ADD_ITEM', product, cantidad });
  const removeItem = (productId: string) =>
    dispatch({ type: 'REMOVE_ITEM', productId });
  const updateQuantity = (productId: string, cantidad: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, cantidad });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ items: state.items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
