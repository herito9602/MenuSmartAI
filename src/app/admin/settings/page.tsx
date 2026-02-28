import { Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Configuración</h1>
        <p className="text-neutral-500 text-sm">Administra los detalles generales de tu restaurante.</p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Settings className="w-5 h-5 mr-2 text-neutral-400" />
            Perfil del Restaurante
          </CardTitle>
          <CardDescription>Esta información será visible en el menú digital de tus clientes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Nombre del Local</label>
            <Input defaultValue="Mitsuharu" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Descripción o Slogan</label>
            <Input defaultValue="Cocina de Autor" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Moneda Base</label>
            <select className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="MXN">MXN ($)</option>
              <option value="COP">COP ($)</option>
            </select>
          </div>
        </CardContent>
        <CardFooter className="bg-neutral-50 border-t border-neutral-100 flex justify-end">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </CardFooter>
      </Card>
      
      <p className="text-sm text-neutral-400 text-center pt-4">
        (Modo de demostración: Los cambios aquí no se guardan permanentemente)
      </p>
    </div>
  );
}
