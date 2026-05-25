import { prisma } from "@/lib/prisma";
import CartClient from "@/components/CartClient";
import Link from "next/link";

export const revalidate = 0; 

export default async function CarritoPage() {
  // 1. Buscamos la tasa de forma segura
  const tasaData = await prisma.configuracion_tasa.findFirst({
    orderBy: { ultima_actualizacion: 'desc' }
  });
  
  // 2. Convertimos el Decimal a String y luego a Número (Una sola línea limpia)
  const tasa = tasaData?.tasa_ves_por_usd ? Number(tasaData.tasa_ves_por_usd.toString()) : 1;

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Navbar Superior con botón de volver */}
      <nav className="bg-blue-700 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-sm bg-blue-800/50 px-3 py-1.5 rounded-lg border border-blue-400/30 hover:bg-blue-800 transition">
            ← Volver a la tienda
          </Link>
          <div className="bg-blue-800/50 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-400/30 backdrop-blur-sm">
            Tasa: {tasa.toFixed(2)} Bs
          </div>
        </div>
      </nav>

      {/* Contenedor del Carrito */}
      <div className="max-w-4xl mx-auto p-4 pt-8">
        <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
          Tu Carrito <span className="ml-2">🛒</span>
        </h2>
        
        {/* Quitamos "tasa={tasa}" para que TypeScript no se queje */}
        <CartClient />
      </div>
    </main>
  );
}