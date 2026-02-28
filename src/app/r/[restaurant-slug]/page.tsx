'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { CategoryNav } from '@/components/menu/CategoryNav';
import { DishCard } from '@/components/menu/DishCard';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Destacados' },
  { id: '2', name: 'Entradas' },
  { id: '3', name: 'Platos Fuertes' },
  { id: '4', name: 'Postres' },
  { id: '5', name: 'Bebidas' },
];

const MOCK_ITEMS = [
  { id: '101', category_id: '1', name: 'Hamburguesa Trufada', description: 'Carne Angus 200g, queso brie, mayo de trufa negra, pan brioche artesanal.', price: 18.50, is_available: true, calories: 850, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop' },
  { id: '102', category_id: '1', name: 'Tacos Al Pastor', description: 'Tres tacos tradicionales con piña asada, cebolla y cilantro fresco.', price: 12.00, is_available: true, calories: 500, image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=800&auto=format&fit=crop' },
  { id: '103', category_id: '2', name: 'Ceviche Clásico', description: 'Pesca del día curada en limón sutil, ají limo, maíz chulpi y camote glaseado.', price: 15.00, is_available: true, calories: 300, image_url: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?q=80&w=800&auto=format&fit=crop' },
  { id: '104', category_id: '3', name: 'Risotto de Hongos', description: 'Mix de setas silvestres, parmesano madurado y aceite de trufa blanca.', price: 22.00, is_available: false, calories: 750, image_url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop' },
  { id: '105', category_id: '4', name: 'Volcán de Chocolate', description: 'Centro líquido de chocolate amargo 70%, helado de vainilla.', price: 9.50, is_available: true, calories: 600, image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop' },
];

export default function MobileMenu() {
  const [activeCategory, setActiveCategory] = useState(MOCK_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items by search query or active category
  const filteredItems = MOCK_ITEMS.filter(item => {
    if (searchQuery.trim() !== '') {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             item.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return item.category_id === activeCategory;
  });

  return (
    <div className="flex flex-col h-full min-h-screen pb-6">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-black/80 backdrop-blur-xl sticky top-0 z-30 border-b border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">MenuSmart</h1>
            <p className="text-sm font-medium text-white/50">Cocina de Autor</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden">
             {/* Logo Placeholder */}
             <span className="text-lg font-bold text-white">M</span>
          </div>
        </div>

        <div className="relative mb-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Buscar plato o ingrediente..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-shadow"
          />
        </div>
      </header>

      {/* Category Nav - Hide when searching */}
      {searchQuery.trim() === '' && (
        <CategoryNav 
          categories={MOCK_CATEGORIES} 
          activeId={activeCategory} 
          onSelect={setActiveCategory} 
        />
      )}

      {/* Dish List */}
      <main className="px-4 mt-6">
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <DishCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
          
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="py-16 px-6 text-center"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Search className="w-6 h-6 text-white/40" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No encontramos resultados</h3>
              <p className="text-white/40 text-sm">
                Intenta buscar con otros ingredientes o revisa nuestras categorías principales.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Floating Action / Order Button Placeholder */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-40">
         <button className="w-full bg-white text-black font-semibold rounded-2xl py-4 shadow-[0_8px_30px_rgb(255,255,255,0.12)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
           <ShoppingBag className="w-5 h-5" />
           Ver Pedido
         </button>
      </div>
    </div>
  );
}
