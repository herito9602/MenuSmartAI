'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChefHat, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Demo credentials - in production this would be handled by Supabase Auth
const DEMO_EMAIL = 'demo@menusmart.ai';
const DEMO_PASSWORD = 'demo1234';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small loading delay
    await new Promise(resolve => setTimeout(resolve, 600));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Set a session cookie (expires in 1 day)
      document.cookie = `menusmart_session=demo; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
      router.push('/admin/menu');
    } else {
      setError('Correo o contraseña incorrectos. Usa la cuenta demo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 selection:bg-orange-500/30">
      <div className="w-full max-w-[400px]">
        {/* Logo Header */}
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <Link href="/" className="w-14 h-14 bg-white shadow-sm border border-neutral-200 rounded-2xl flex items-center justify-center mb-6 hover:scale-105 transition-transform">
            <ChefHat className="w-7 h-7 text-orange-600" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">Bienvenido de vuelta</h1>
          <p className="text-sm text-neutral-500">
            Ingresa a tu panel de administración MenuSmart.
          </p>
        </div>

        {/* Demo Credentials hint */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 mb-5 text-sm text-orange-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Cuenta demo:</strong> demo@menusmart.ai / demo1234
          </span>
        </div>

        {/* Login Form Card */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 mb-6">
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 bg-neutral-50/50 border-neutral-200 text-base rounded-xl focus-visible:ring-orange-500"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input 
                  type="password" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 h-12 bg-neutral-50/50 border-neutral-200 text-base rounded-xl focus-visible:ring-orange-500"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end">
              <Link href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-neutral-900 hover:bg-black text-white rounded-xl text-base font-medium transition-shadow hover:shadow-lg hover:shadow-black/10 disabled:opacity-60"
            >
              {loading ? 'Verificando...' : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center text-sm text-neutral-500">
          ¿Eres nuevo aquí?{' '}
          <Link href="/" className="font-medium text-neutral-900 hover:underline">
            Solicita acceso
          </Link>
        </div>
      </div>
    </div>
  );
}
