"use client";

import { useCartStore } from "@/lib/store";
import Link from "next/link"; // IMPORTANTE: Agregamos Link

export default function FloatingCart() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Cambiamos <button> por <Link> apuntando a /carrito */}
      <Link href="/carrito" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center ring-4 ring-white transition-transform active:scale-95">
        <span className="font-bold text-lg mr-2">🛒</span>
        <span className="font-black text-sm bg-white text-green-600 px-2 py-0.5 rounded-full">
          {totalItems}
        </span>
      </Link>
    </div>
  );
}