import { prisma } from "@/lib/prisma";
import FloatingCart from "@/components/FloatingCart";
import Storefront from "@/components/Storefront";

export const revalidate = 0; 

export default async function Home() {
  const tasaData = await prisma.configuracion_tasa.findFirst({
    orderBy: { ultima_actualizacion: 'desc' }
  });
  const tasa = tasaData?.tasa_ves_por_usd ? Number(tasaData.tasa_ves_por_usd) : 1;

  const productos = await prisma.productos.findMany({
    where: { esta_disponible: true }
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Navbar Superior */}
      <nav className="bg-blue-700 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter italic">MERCABARI</h1>
          <div className="bg-blue-800/50 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-400/30 backdrop-blur-sm">
            Tasa: {tasa.toFixed(2)} Bs
          </div>
        </div>
      </nav>

      {/* Banner Hero */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-500 pt-8 pb-16 px-4 shadow-inner">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Todo lo que necesitas, <span className="text-yellow-300">en la puerta de tu casa.</span>
          </h2>
          <p className="text-blue-100 text-sm md:text-base font-medium max-w-xl mx-auto">
            Selecciona tus productos, agrégalos al carrito y finaliza tu pedido por WhatsApp en menos de 2 minutos.
          </p>
        </div>
      </div>

      {/* Aquí llamamos a nuestro nuevo componente interactivo */}
      <Storefront productos={productos} tasa={tasa} />

      <FloatingCart />
    </main>
  );
}