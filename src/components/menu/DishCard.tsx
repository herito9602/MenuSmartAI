'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, ImageOff } from 'lucide-react';
import { useState } from 'react';

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  calories: number;
};

export function DishCard({ item, index }: { item: Item; index: number }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group bg-[#111111] overflow-hidden rounded-3xl p-4 border transition-all ${
        item.is_available ? 'border-white/5 hover:border-white/20' : 'opacity-50 grayscale border-transparent pointer-events-none'
      }`}
    >
      <div className="flex gap-4 items-start">
        {/* Detail */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-lg text-white/90 truncate">{item.name}</h3>
            {!item.is_available && (
              <span className="text-[10px] uppercase font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-md">
                Agotado
              </span>
            )}
          </div>
          <p className="text-sm text-white/40 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-orange-400">${item.price.toFixed(2)}</span>
            {item.calories && (
               <span className="text-xs font-medium text-white/30 bg-white/5 px-2 py-1 rounded-full">{item.calories} kcal</span>
            )}
          </div>
        </div>

        {/* Thumbnail Component */}
        <div className="w-28 h-28 shrink-0 flex items-center justify-center bg-white/5 rounded-2xl overflow-hidden relative">
           {item.image_url ? (
             <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
           ) : (
             <ImageOff className="w-6 h-6 text-white/20" />
           )}
           
           {/* Add Button Inside Image if Available */}
           {item.is_available && quantity === 0 && (
             <button 
               onClick={(e) => { e.stopPropagation(); setQuantity(1); }}
               className="absolute bottom-2 right-2 w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:bg-white text-white hover:text-black transition-colors"
             >
               <Plus className="w-4 h-4" />
             </button>
           )}
        </div>
      </div>

       {/* Quantity Adjuster Reveal */}
       {item.is_available && quantity > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
             <span className="text-sm text-white/60 font-medium">Cantidad</span>
             <div className="flex items-center gap-3 bg-white/10 rounded-full p-1">
               <button 
                 onClick={() => setQuantity(q => Math.max(0, q - 1))}
                 className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
               >
                 <Minus className="w-4 h-4" />
               </button>
               <span className="w-4 text-center font-bold text-white">{quantity}</span>
               <button 
                 onClick={() => setQuantity(q => q + 1)}
                 className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-neutral-200 text-black shadow-lg transition-transform active:scale-90"
               >
                 <Plus className="w-4 h-4" />
               </button>
             </div>
          </div>
       )}
    </motion.div>
  );
}
