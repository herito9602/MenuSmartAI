import Link from 'next/link';
import { ChefHat, Smartphone, Zap, BarChart3, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-orange-500/30">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-orange-500" />
            <span className="font-bold text-lg tracking-tight">MenuSmart AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/r/demo" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors hidden sm:block">
              Ver Demo
            </Link>
            <Link href="/admin/login">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>La evolución del menú digital</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Menús que <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">venden más solos.</span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Olvídate de los PDFs estáticos. Menú en vivo, control de stock al instante y un Ingeniero de Menú en Inteligencia Artificial sugiriendo cómo aumentar tus ganancias cada semana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/login">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg shadow-orange-900/20">
                Pruébalo Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/r/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-full backdrop-blur-md">
                <Smartphone className="w-5 h-5 mr-3 text-neutral-300" />
                Explorar Demo Pública
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-neutral-900 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo el control en tu bolsillo</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">MenuSmart no es solo una lista de precios, es una herramienta operativa y de marketing para tu local.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-black/50 p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6">
                <QrCode className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Menú Dinámico (QR)</h3>
              <p className="text-neutral-400 leading-relaxed">
                Experiencia móvil premium. Tus clientes navegan fluidamente como en una App nativa, sin tener que descargar nada.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-black/50 p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stock en Tiempo Real</h3>
              <p className="text-neutral-400 leading-relaxed">
                ¿Se acabó el salmón? Apágalo con un clic en tu panel de control y desaparecerá del menú de las mesas al instante.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-black/50 p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ingeniero de Menú IA</h3>
              <p className="text-neutral-400 leading-relaxed">
                Conectado a OpenAI (GPT-4), analizamos qué platos se ven pero no se venden y te aconsejamos en precios y promociones semanales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes simples para negocios serios</h2>
          <p className="text-neutral-400">Escala a tu propio ritmo. Cancela cuando quieras.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          
          {/* Essential Plan */}
          <div className="bg-neutral-900 p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-semibold mb-2">Esencial</h3>
            <p className="text-neutral-400 mb-6">Ideal para empezar a digitalizar.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">$29</span>
              <span className="text-neutral-500 font-medium">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Menú Dinámico Ilimitado', 'Generador QR descargable', 'Control de Stock Básico'].map((feature) => (
                <li key={feature} className="flex items-center text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full h-12 rounded-xl border-white/20 text-white hover:bg-white/10">
              Comenzar con Esencial
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-orange-900/40 to-black p-8 rounded-3xl border border-orange-500/50 relative shadow-2xl shadow-orange-900/20">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Recomendado
            </div>
            <h3 className="text-2xl font-semibold mb-2">Pro IA</h3>
            <p className="text-orange-200/60 mb-6">Para restaurantes que quieren vender más.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">$79</span>
              <span className="text-orange-200/50 font-medium">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Todo lo del plan Esencial', 'Reportes de Analítica en Vivo', 'Ingeniero de Menú IA Semanal (GPT-4o)', 'Actualización en Tiempo Real (WebSockets)', 'Soporte Prioritario'].map((feature) => (
                <li key={feature} className="flex items-center text-white">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white">
              Prueba Gratuita de 14 Días
            </Button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-neutral-500" />
            <span className="font-semibold text-neutral-400">MenuSmart AI &copy; 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-neutral-500 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Términos</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
