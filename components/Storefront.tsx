"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function Storefront({ productos, tasa }: { productos: any[], tasa: number }) {
  const [busqueda, setBusqueda] = useState("");
  // Estado para saber qué categoría seleccionó el usuario
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  // Sacamos una lista única de todas las categorías que tienes en la base de datos
  const categoriasUnicas = ["Todas", ...Array.from(new Set(productos.map(p => p.categoria_id || "Otros")))];

  // Filtramos las ofertas reales de la base de datos (donde es_oferta sea true)
  const productosOferta = productos.filter(p => p.es_oferta);

  // Filtramos los productos según la búsqueda y la categoría seleccionada
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaActiva === "Todas" || (producto.categoria_id || "Otros") === categoriaActiva;
    return coincideBusqueda && coincideCategoria;
  });

  // Agrupamos para el catálogo normal
  const productosPorCategoria = productosFiltrados.reduce((acumulador, producto) => {
    const categoria = producto.categoria_id || "Otros"; 
    if (!acumulador[categoria]) {
      acumulador[categoria] = [];
    }
    acumulador[categoria].push(producto);
    return acumulador;
  }, {} as Record<string, typeof productos>);

  return (
    <div className="max-w-6xl mx-auto p-4 -mt-8 relative z-10">
      
      {/* 1. BARRA DE BÚSQUEDA */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-4 max-w-xl mx-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Buscar productos (ej. Arroz, Harina...)"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-colors outline-none text-gray-800 text-sm font-medium"
          />
        </div>
      </div>

      {/* 2. BARRA DE FILTROS (Pills horizontales) */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 snap-x">
        {categoriasUnicas.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat as string)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all snap-start shadow-sm border ${
              categoriaActiva === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. CARRUSEL DE OFERTAS DESTACADAS */}
      {/* Se muestra si no hay búsqueda, estamos en "Todas" y HAY ofertas activas */}
      {busqueda === "" && categoriaActiva === "Todas" && productosOferta.length > 0 && (
        <div className="mb-10 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-3xl border border-orange-100">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">🔥</span>
            <h3 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-wide">
              Ofertas de la Semana
            </h3>
          </div>
          {/* Contenedor deslizable horizontal */}
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            {productosOferta.map((producto: any) => (
              <div key={`oferta-${producto.id}`} className="min-w-[160px] md:min-w-[200px] snap-start">
                <ProductCard 
                  id={producto.id}
                  nombre={producto.nombre}
                  precioUsd={Number(producto.precio_venta_usd)} 
                  tasa={tasa}
                  imagenUrl={producto.imagen_url} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CATÁLOGO DE PRODUCTOS (Agrupados) */}
      {Object.keys(productosPorCategoria).length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
          <span className="text-4xl">🤔</span>
          <h3 className="mt-4 text-lg font-bold text-gray-700">No encontramos ese producto</h3>
          <p className="text-sm text-gray-500 mt-1">Intenta con otra palabra clave o categoría.</p>
        </div>
      ) : (
        Object.entries(productosPorCategoria).map(([nombreCategoria, productosDeEstaCategoria]) => (
          <section key={nombreCategoria} className="mb-12 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="h-8 w-1.5 bg-blue-600 rounded-full mr-3"></div>
              <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-wide">
                {nombreCategoria}
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(productosDeEstaCategoria as any[]).map((producto: any) => (
                <ProductCard 
                  key={producto.id} 
                  id={producto.id}
                  nombre={producto.nombre}
                  precioUsd={Number(producto.precio_venta_usd)} 
                  tasa={tasa}
                  imagenUrl={producto.imagen_url} 
                />
              ))}
            </div>
          </section>
        ))
      )}

    </div>
  );
}