'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, UtensilsCrossed, QrCode, BarChart3, Settings, Home, ChefHat, LogOut } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Resumen', href: '/admin' },
  { icon: UtensilsCrossed, label: 'Editor de Menú', href: '/admin/menu' },
  { icon: QrCode, label: 'Código QR', href: '/admin/qr' },
  { icon: BarChart3, label: 'AI Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Configuración', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the session cookie
    document.cookie = 'menusmart_session=; path=/; max-age=0; SameSite=Lax';
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex text-neutral-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-5 border-b border-neutral-100">
          <Link href="/admin/menu" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-orange-600" />
            </div>
            <span className="font-semibold text-neutral-900">MenuSmart Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <item.icon className="w-5 h-5 text-neutral-500" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
          <p className="text-xs text-neutral-400 text-center mt-3">&copy; 2026 MenuSmart AI</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <header className="h-16 flex items-center justify-between px-8 border-b border-neutral-200 bg-white md:hidden">
          <span className="text-xl font-bold text-orange-600">MenuSmart</span>
          <button onClick={handleLogout} className="text-neutral-500">
            <LogOut className="w-5 h-5" />
          </button>
        </header>
        <div className="p-8 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Floating Home Button */}
      <Link 
        href="/"
        className="fixed bottom-6 left-6 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <Home className="w-6 h-6" />
        <span className="absolute left-full ml-3 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Volver al Inicio
        </span>
      </Link>
    </div>
  );
}
