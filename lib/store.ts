import { create } from 'zustand';

export interface CartItem {
  id: string;
  nombre: string;
  precioBs: number;
  precioUsd: number;
  cantidad: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'cantidad'>) => void;
  decreaseQuantity: (id: string) => void; // NUEVA FUNCIÓN
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addToCart: (producto) => set((state) => {
    const itemExiste = state.items.find((i) => i.id === producto.id);
    if (itemExiste) {
      return {
        items: state.items.map((i) => 
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      };
    }
    return { items: [...state.items, { ...producto, cantidad: 1 }] };
  }),

  // NUEVA LÓGICA: Resta 1. Si llega a 0, lo elimina del carrito.
  decreaseQuantity: (id) => set((state) => {
    const itemExiste = state.items.find((i) => i.id === id);
    if (itemExiste && itemExiste.cantidad > 1) {
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
        )
      };
    }
    return { items: state.items.filter((i) => i.id !== id) };
  }),

  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id)
  })),

  clearCart: () => set({ items: [] })
}));