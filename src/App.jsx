import React, { useState } from 'react';
import { ShoppingCart, List, Package } from 'lucide-react';

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('pos');

  const productosPrueba = [
    { id: 1, nombre: 'Playera Premium', precio: 150 },
    { id: 2, nombre: 'Pantalón Mezclilla', precio: 350 },
    { id: 3, nombre: 'Sudadera', precio: 250 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="bg-white p-4 shadow-md font-black text-blue-600 text-center text-xl">
        PACA PRO v1.0
      </header>

      <main className="p-4">
        {vista === 'pos' ? (
          <div className="space-y-4">
            <div className="bg-blue-600 p-6 rounded-3xl text-white">
              <p className="text-xs uppercase opacity-70">Total Venta</p>
              <p className="text-4xl font-black">${carrito.reduce((acc, p) => acc + p.precio, 0)}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow">
              {carrito.length === 0 ? <p className="text-gray-400 text-center">Carrito vacío</p> : 
                carrito.map((p, i) => <div key={i} className="flex justify-between border-b py-2"><span>{p.nombre}</span><b>${p.precio}</b></div>)
              }
            </div>
            <button onClick={() => {alert('Venta Guardada'); setCarrito([])}} className="w-full bg-black text-white py-4 rounded-2xl font-bold">COBRAR</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {productosPrueba.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-2xl shadow text-center">
                <Package className="mx-auto text-blue-200 mb-2" size={40} />
                <p className="font-bold">{p.nombre}</p>
                <p className="text-blue-600 font-black">${p.precio}</p>
                <button onClick={() => setCarrito([...carrito, p])} className="mt-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-lg text-sm font-bold">Añadir</button>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full bg-white p-4 flex justify-around border-t">
        <button onClick={() => setVista('pos')} className={vista === 'pos' ? "text-blue-600" : "text-gray-400"}><ShoppingCart /><span className="text-[10px] block">VENTA</span></button>
        <button onClick={() => setVista('catalogo')} className={vista === 'catalogo' ? "text-blue-600" : "text-gray-400"}><List /><span className="text-[10px] block">CATÁLOGO</span></button>
      </nav>
    </div>
  );
}
