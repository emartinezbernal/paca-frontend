import React, { useState, useEffect } from 'react';
import { ShoppingCart, Tag, List, Package, Trash2 } from 'lucide-react';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('pos'); 

  // REEMPLAZA ESTA URL cuando tengas tu link de RENDER
  const API_URL = "http://localhost:5000/api"; 

  const agregarAlCarrito = (p) => {
    setCarrito([...carrito, { ...p, id_temp: Date.now() }]);
  };

  const eliminarDelCarrito = (idTemp) => {
    setCarrito(carrito.filter(item => item.id_temp !== idTemp));
  };

  const finalizarVenta = () => {
    if (carrito.length === 0) return;
    alert("Venta registrada. Total: $" + carrito.reduce((acc, p) => acc + p.precio, 0));
    setCarrito([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white p-5 border-b flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-black text-blue-600">PACA PRO <span className="text-gray-400 font-normal">v1.0</span></h1>
        <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full font-bold">ONLINE</span>
      </header>

      <main className="p-4 flex-grow mb-20">
        {vista === 'pos' ? (
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white shadow-lg">
              <span className="text-blue-200 text-xs font-bold uppercase">Total a Cobrar</span>
              <p className="text-5xl font-black mt-1">${carrito.reduce((acc, p) => acc + (p.precio || 0), 0)}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b font-bold text-sm flex justify-between">
                <span>Artículos ({carrito.length})</span>
                <button onClick={() => setCarrito([])} className="text-red-500 text-xs text-right">Vaciar</button>
              </div>
              <div className="p-4 space-y-3">
                {carrito.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4 italic">Carrito vacío</p>
                ) : (
                  carrito.map((item) => (
                    <div key={item.id_temp} className="flex justify-between items-center animate-in fade-in">
                      <div>
                        <p className="font-bold text-sm">{item.nombre}</p>
                        <p className="text-[10px] text-gray-400">SKU: {item.sku || 'N/A'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-blue-600">${item.precio}</span>
                        <button onClick={() => eliminarDelCarrito(item.id_temp)} className="text-gray-300"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              onClick={finalizarVenta}
              disabled={carrito.length === 0}
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-bold text-lg active:scale-95 transition-all shadow-lg disabled:bg-gray-200 disabled:shadow-none"
            >
              COBRAR AHORA
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pb-10">
            {/* Ejemplo Manual - Esto vendrá de tu BD luego */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
                <Package size={20} />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Playera Básica</p>
              <p className="font-black text-lg mt-1">$120</p>
              <button 
                onClick={() => agregarAlCarrito({nombre: 'Playera Paca', precio: 120, sku: 'P-001'})}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-bold active:bg-black transition-colors"
              >
                + AGREGAR
              </button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 p-4 flex justify-around items-center z-50 shadow-inner">
        <button onClick={() => setVista('pos')} className={`flex flex-col items-center ${vista === 'pos' ? 'text-blue-600' : 'text-gray-400'}`}>
          <ShoppingCart size={24} strokeWidth={vista === 'pos' ? 3 : 2} />
          <span className="text-[10px] font-bold mt-1 uppercase">Venta</span>
        </button>
        <button onClick={() => setVista('catalogo')} className={`flex flex-col items-center ${vista === 'catalogo' ? 'text-blue-600' : 'text-gray-400'}`}>
          <List size={24} strokeWidth={vista === 'catalogo' ? 3 : 2}/>
          <span className="text-[10px] font-bold mt-1 uppercase">Inventario</span>
        </button>
      </nav>
    </div>
  );
}
