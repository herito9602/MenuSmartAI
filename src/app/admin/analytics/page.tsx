'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const generateReport = async () => {
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ restaurantId: 'dummy-id' }),
      });
      const data = await res.json();
      if (data.suggestion) {
        setReport(data.suggestion);
      } else {
        setReport('Error al generar el reporte.');
      }
    } catch (e) {
      console.error(e);
      setReport('Hubo un error de conexión con la IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">AI Analytics</h1>
          <p className="text-neutral-500 text-sm">Convierte tus datos de clics en estrategias de ventas con GPT-4o.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Core Metrics */}
        <Card className="col-span-1 border-neutral-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center font-medium">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500"/>
              Vistas Totales (7 días)
            </CardDescription>
            <CardTitle className="text-4xl text-neutral-900 pt-2">1,600</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-600 font-medium">+12% vs. semana anterior</p>
          </CardContent>
        </Card>

        {/* AI Action Card */}
        <Card className="col-span-1 md:col-span-2 border-orange-200 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-orange-900">
              <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
              Ingeniero de Menú IA
            </CardTitle>
            <CardDescription className="text-orange-700/80">
              Usa los datos de esta semana para ajustar precios e inventarios.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {report ? (
               <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-orange-200/50 text-neutral-800 text-sm leading-relaxed whitespace-pre-wrap">
                 {report}
               </div>
             ) : (
               <div className="bg-white/40 border border-dashed border-orange-300 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                 <AlertCircle className="w-8 h-8 text-orange-400 mb-3" />
                 <p className="text-sm font-medium text-orange-900">Ningún reporte generado hoy.</p>
                 <p className="text-xs text-orange-700 mt-1 max-w-xs">
                   El asistente analizará métricas de clicks para dar recomendaciones.
                 </p>
               </div>
             )}
          </CardContent>
          <CardFooter className="justify-end">
             <Button 
               onClick={generateReport} 
               disabled={loading}
               className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm transition-all"
             >
               {loading ? (
                 <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
               ) : (
                 <Sparkles className="w-4 h-4 mr-2" />
               )}
               {loading ? 'Analizando datos...' : 'Generar Estrategia'}
             </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Mock Analytics Details Graph Placeholder */}
      <Card className="border-neutral-200 shadow-sm opacity-50 grayscale select-none">
        <CardHeader>
          <CardTitle className="text-lg">Tráfico por Plato (Demostración)</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="h-64 w-full bg-neutral-100 rounded-xl flex items-center justify-center border border-dashed border-neutral-300">
             <span className="text-neutral-400 font-medium">Gráfico de barras de clics próximamente</span>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
