import { ReactNode } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function RestaurantLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50 pb-20 selection:bg-orange-500/30">
      <div className="max-w-md mx-auto relative bg-black min-h-screen shadow-2xl overflow-hidden ring-1 ring-white/10">
        {children}
      </div>

      {/* Floating Home Button for Demo Purposes */}
      <Link 
        href="/"
        className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 z-50 bg-orange-600 text-white p-4 rounded-full shadow-2xl shadow-orange-500/50 hover:scale-110 hover:bg-orange-500 transition-transform flex items-center justify-center group border border-white/10"
      >
        <Home className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-neutral-800 text-white font-medium text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Volver al Inicio
        </span>
      </Link>
    </div>
  );
}
