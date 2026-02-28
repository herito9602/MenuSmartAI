'use client';

import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function QrGenerator() {
  const [restaurantSlug, setRestaurantSlug] = useState('mitsuharu');
  const [origin, setOrigin] = useState('https://menusmart.vercel.app');
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically set to the actual hosted domain (localhost or deployed) 
    // after component mounts to avoid hydration mismatch
    setOrigin(window.location.origin);
  }, []);

  const menuUrl = `${origin}/r/${restaurantSlug}`;

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    
    // Convert SVG to Data URL and download
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-menu-${restaurantSlug}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Código QR del Menú</h1>
        <p className="text-neutral-500 text-sm">Genera, descarga e imprime el código QR para las mesas.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Settings Panel */}
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Configuración del Enlace</CardTitle>
            <CardDescription>Asegúrate de que el slug coincida con el de tu restaurante.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Identificador (Slug)</label>
              <Input 
                value={restaurantSlug} 
                onChange={(e) => setRestaurantSlug(e.target.value)}
                placeholder="ej. la-trattoria" 
              />
            </div>
            
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-neutral-700">URL del Menú Dinámico</label>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-600 break-all">
                {menuUrl}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
               <Button onClick={downloadQR} className="bg-orange-600 hover:bg-orange-700 flex-1">
                 <Download className="w-4 h-4 mr-2" />
                 Descargar PNG
               </Button>
               <Button variant="outline" className="flex-1">
                 <Printer className="w-4 h-4 mr-2" />
                 Imprimir
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Preview Panel */}
        <Card className="border-neutral-200 shadow-sm bg-neutral-50 flex flex-col items-center justify-center p-12 text-center">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 mb-6" ref={qrRef}>
             <QRCodeSVG 
               value={menuUrl} 
               size={240}
               bgColor={"#ffffff"}
               fgColor={"#000000"}
               level={"Q"}
               includeMargin={false}
               imageSettings={{
                 src: "https://cdn-icons-png.flaticon.com/512/3170/3170733.png", // A simple fork/knife dummy icon
                 x: undefined,
                 y: undefined,
                 height: 48,
                 width: 48,
                 excavate: true,
               }}
             />
           </div>
           <h3 className="font-semibold text-neutral-900 mb-1">Escanea para ordenar</h3>
           <p className="text-sm text-neutral-500 max-w-[250px]">
             Coloca este QR en los habladores de mesa o a la entrada del local.
           </p>
        </Card>
      </div>
    </div>
  );
}
