import React, { useState, useEffect } from 'react';
import { ShoppingCart, Camera, Tag, List, Package } from 'lucide-react';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('pos'); 

  // URL provisional (la cambiaremos cuando tengas Render)
  const API_URL = "https://tu-backend-en-render.com/api";

  // Simulación de carga de datos iniciales
  useEffect(() => {
    // Aquí el sistema buscará los productos de tu base de datos
    // Por ahora, si la base está vacía, mostrará una lista vacía
  }, []);

  const agregarAlCarrito = (p) => {
    setCarrito([...carrito, p]);
  };

  const finalizarVenta = () => {
    if (carrito.length === 0) return;
    alert("💰 Venta procesada localmente. Conecta el backend para guardar.");
    setCarrito([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* HEADER */}
      <header className="bg-white p-5 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter text-blue-600 italic">PACA PRO v1</h1>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">TIENDA ONLINE</div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p-4 flex-grow mb-20">
        {vista === 'pos' ? (
          <div className="max-w-md mx-auto space-y-4">
            {/* TOTAL */}
            <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-200">
              <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Total en Carrito</span>
              <p className="text-5xl font-black mt-1">${carrito.reduce((acc, p) => acc + (p.precio || 0), 0)}</p>
            </div>

            {/* CARRITO */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4 flex items-center gap-2"><ShoppingCart size={18}/> Artículos</h3>
              {carrito.length === 0 ? (
                <p className="text-gray-400 text-sm italic text-center py-4">Carrito vacío. Ve al catálogo para agregar.</p>
              ) : (
                carrito.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                    <span>{item.nombre}</span>
                    <span className="font-bold">${item.precio}</span>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={finalizarVenta}
              className="w-full bg-black text-white py-5 rounded-[2rem] font-bold text-lg active:scale-95 transition-transform"
            >
              REGISTRAR VENTA
            </button>
          </div>
        ) : (
          /* CATÁLOGO */
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {/* Ejemplo de producto manual para probar */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                <Package className="text-blue-500" size={20} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase">Prenda Básica</span>
              <p className="font-black text-lg">$150</p>
              <button 
                onClick={() => agregarAlCarrito({nombre: 'Prenda Paca', precio: 150})}
                className="mt-3 w-full bg-gray-100 hover:bg-blue-600 hover:text-white py-2 rounded-xl text-xs font-bold transition-colors"
              >
                + AGREGAR
              </button>
            </div>
          </div>
        )}
      </main>

      {/* NAVBAR INFERIOR */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 p-4 flex justify-around items-center z-50">
        <button onClick={() => setVista('pos')} className={`flex flex-col items-center ${vista === 'pos' ? 'text-blue-600' : 'text-gray-400'}`}>
