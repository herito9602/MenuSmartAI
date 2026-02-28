'use client';

import { motion } from 'framer-motion';

type Category = {
  id: string;
  name: string;
};

interface CategoryNavProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  return (
    <div className="sticky top-[140px] z-20 bg-black/80 backdrop-blur-xl border-b border-white/5 pb-2 -mt-2">
      <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-none snap-x snap-mandatory">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap snap-start transition-colors duration-300 ${
                isActive ? 'text-black bg-white' : 'text-white/60 bg-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category.name}
              {isActive && (
                <motion.div
                  layoutId="active-category"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
