"use client";

import { useCartStore } from "@/lib/store";
import { useState } from "react";

export default function CartClient() {
  const { items, addToCart, decreaseQuantity, clearCart } = useCartStore();
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccion, setDireccion] = useState("");

  const totalUsd = items.reduce((total, item) => total + (item.precioUsd * item.cantidad), 0);
  const totalBs = items.reduce((total, item) => total + (item.precioBs * item.cantidad), 0);

  const enviarPedido = () => {
    if (!nombreCliente || !direccion) {
      alert("Por favor, llena tu nombre y dirección exacta para el delivery.");
      return;
    }

    let mensaje = `*¡Hola MercaBari!* 🛒 Quiero hacer un pedido:\n\n`;
    mensaje += `*Cliente:* ${nombreCliente}\n`;
    mensaje += `*Dirección de Entrega:* ${direccion}\n\n`;
    mensaje += `*Mi Pedido:*\n`;
    
    items.forEach(item => {
      mensaje += `- ${item.cantidad}x ${item.nombre} ($${(item.precioUsd * item.cantidad).toFixed(2)})\n`;
    });

    mensaje += `\n*TOTAL PRODUCTOS:* ${totalBs.toFixed(2)} Bs ($${totalUsd.toFixed(2)})\n`;
    mensaje += `_Nota: Entiendo que el delivery ($1 a $1.5) se calculará según mi zona._\n\n`;
    mensaje += `¿Me facilitan los datos del Pago Móvil por favor?`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Recuerda cambiar esto por tu número real
    const numeroWhatsApp = "584126386248"; 
    
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
    
    // Vaciamos el carrito automáticamente después de enviar el mensaje
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl">🛵</span>
        <h2 className="text-2xl font-bold mt-4 text-gray-700">Tu carrito está vacío</h2>
        <p className="text-gray-500 mt-2">¡Agrega víveres y te los llevamos a casa!</p>
        <a href="/" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Volver a la tienda</a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold mb-6 border-b pb-2 text-gray-800">Tu Pedido</h2>
      
      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-800">{item.nombre}</h3>
              <p className="text-xs text-gray-500">${item.precioUsd.toFixed(2)} c/u</p>
            </div>
            
            <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full border border-gray-200">
              <button onClick={() => decreaseQuantity(item.id)} className="text-blue-600 font-bold text-lg px-2">-</button>
              <span className="font-bold text-sm w-4 text-center">{item.cantidad}</span>
              <button onClick={() => addToCart(item)} className="text-blue-600 font-bold text-lg px-2">+</button>
            </div>
            
            <div className="w-20 text-right">
              <p className="font-bold text-sm text-green-600">{(item.precioBs * item.cantidad).toFixed(2)} Bs</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span>🛵</span> Datos para el Delivery
        </h3>
        <input 
          type="text" 
          placeholder="Tu Nombre y Apellido" 
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black"
        />
        <textarea 
          placeholder="Dirección exacta en Barinas (Sector, calle, número de casa, punto de referencia...)" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24 text-black"
        ></textarea>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between text-gray-600 mb-1">
          <span>Total Ref:</span>
          <span className="font-medium">${totalUsd.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-end mb-1">
          <span className="font-bold text-lg text-gray-800">Total Productos:</span>
          <span className="font-black text-2xl text-green-600">{totalBs.toFixed(2)} Bs</span>
        </div>
        
        {/* Aviso de Delivery */}
        <p className="text-right text-xs text-orange-600 font-medium mb-6">
          * El delivery ($1 - $1.5) se calculará por WhatsApp
        </p>

        <button 
          onClick={enviarPedido}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 active:scale-95 transition-transform"
        >
          <span>Pedir por WhatsApp</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/></svg>
        </button>
      </div>
    </div>
  );
}