"use client";

import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation"; // IMPORTANTE: Usamos useRouter en lugar de Link

export default function FloatingCart() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
  const router = useRouter(); // Iniciamos el motor de navegación

  if (totalItems === 0) return null;

  return (
    // Le pusimos z-[999] para garantizar que esté por encima de todo el universo
    <div className="fixed bottom-6 right-6 z-[999]">
      <button 
        onClick={() => router.push('/carrito')} // Forzamos el salto a la página del carrito
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center ring-4 ring-white transition-transform active:scale-95 cursor-pointer"
      >
        <span className="font-bold text-lg mr-2">🛒</span>
        <span className="font-black text-sm bg-white text-green-600 px-2 py-0.5 rounded-full">
          {totalItems}
        </span>
      </button>
    </div>
  );
}