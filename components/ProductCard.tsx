"use client";

import { useCartStore } from "@/lib/store";

export default function ProductCard({ 
  id, 
  nombre, 
  precioUsd, 
  tasa,
  imagenUrl
}: { 
  id: string; 
  nombre: string; 
  precioUsd: number; 
  tasa: number;
  imagenUrl?: string | null; 
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const precioBsNum = precioUsd * tasa;
  const precioBs = precioBsNum.toFixed(2);

  const handleAgregar = () => {
    addToCart({
      id,
      nombre,
      precioBs: precioBsNum,
      precioUsd,
    });
    // Opcional: Puedes quitar este alert si te parece muy molesto al agregar rápido
    alert(`¡Agregaste ${nombre}!`); 
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      
      {/* 1. Redujimos la altura de la imagen (h-28) en lugar de hacerla cuadrada */}
      <div className="h-28 bg-white flex items-center justify-center p-2 relative overflow-hidden border-b border-gray-50">
        {imagenUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imagenUrl} 
            alt={nombre} 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        ) : (
          <span className="text-[10px] text-gray-400 font-bold text-center uppercase">
            {nombre}
          </span>
        )}
      </div>

      {/* 2. Redujimos el padding interior (p-2.5) */}
      <div className="p-2.5 flex flex-col flex-grow">
        
        {/* 3. Letra un poco más pequeña (text-xs) y menor altura (h-8) */}
        <h3 className="text-xs font-semibold text-gray-800 leading-tight h-8 line-clamp-2">
          {nombre}
        </h3>

        {/* 4. Márgenes más ajustados */}
        <div className="mt-1.5 flex-grow">
          <p className="text-base font-black text-green-600 leading-none">
            {precioBs} <span className="text-[9px]">Bs</span>
          </p>
          <p className="text-[9px] text-gray-400 font-medium mt-0.5">
            Ref: ${precioUsd.toFixed(2)}
          </p>
        </div>

        {/* 5. Botón más delgado (py-1.5) y menos redondeado (rounded-lg) */}
        <button 
          onClick={handleAgregar}
          className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all shadow-sm"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}