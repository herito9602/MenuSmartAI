'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const MOCK_ITEMS = [
  { id: '101', category: 'Destacados', name: 'Hamburguesa Trufada', price: 18.50, is_available: true, stock_count: 12 },
  { id: '102', category: 'Destacados', name: 'Tacos Al Pastor', price: 12.00, is_available: true, stock_count: 45 },
  { id: '103', category: 'Entradas', name: 'Ceviche Clásico', price: 15.00, is_available: true, stock_count: 8 },
  { id: '104', category: 'Platos Fuertes', name: 'Risotto de Hongos', price: 22.00, is_available: false, stock_count: 0 },
  { id: '105', category: 'Postres', name: 'Volcán de Chocolate', price: 9.50, is_available: true, stock_count: 15 },
];

type Item = typeof MOCK_ITEMS[0];

export default function MenuEditor() {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');

  // --- ADD state ---
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  // --- EDIT state ---
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  // --- DELETE state ---
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ──────────────────── Handlers ────────────────────

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemPrice) return;
    setItems([{
      id: Math.random().toString(),
      category: 'Nuevos',
      name: newItemName,
      price: parseFloat(newItemPrice) || 0,
      is_available: true,
      stock_count: 10,
    }, ...items]);
    setIsAdding(false);
    setNewItemName('');
    setNewItemPrice('');
  };

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPrice(item.price.toString());
  };

  const saveEdit = () => {
    setItems(items.map(item =>
      item.id === editingId
        ? { ...item, name: editName, price: parseFloat(editPrice) || item.price }
        : item
    ));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const confirmDelete = (id: string) => setDeletingId(id);
  const cancelDelete = () => setDeletingId(null);
  const executeDelete = () => {
    setItems(items.filter(item => item.id !== deletingId));
    setDeletingId(null);
  };

  const toggleAvailability = (id: string, currentStatus: boolean) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, is_available: !currentStatus } : item
    ));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Editor de Menú</h1>
          <p className="text-neutral-500 text-sm">Gestiona categorías, platos y disponibilidad en tiempo real.</p>
        </div>
        <Button onClick={() => { setIsAdding(!isAdding); setEditingId(null); }} className="bg-orange-600 hover:bg-orange-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Añadir Plato
        </Button>
      </div>

      {/* Delete Confirmation Banner */}
      {deletingId && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-5 py-3.5 text-sm">
          <div className="flex items-center gap-2 text-red-700 font-medium">
            <Trash className="w-4 h-4" />
            ¿Eliminar "{items.find(i => i.id === deletingId)?.name}"? Esta acción no se puede deshacer.
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={cancelDelete} className="h-8 border-red-200 text-red-600 hover:bg-red-100">
              Cancelar
            </Button>
            <Button size="sm" onClick={executeDelete} className="h-8 bg-red-600 hover:bg-red-700 text-white">
              Sí, eliminar
            </Button>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Buscar por nombre o categoría..."
            className="pl-9 bg-neutral-50 border-neutral-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-neutral-600">Categorías</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Plato</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Disponible (1-Click)</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">

              {/* ── ADD ROW ── */}
              {isAdding && (
                <tr className="bg-orange-50 border-b-2 border-orange-200">
                  <td className="px-6 py-4">
                    <Input
                      placeholder="Nombre del plato..."
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="bg-white border-orange-200 focus-visible:ring-orange-500"
                      autoFocus
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 font-normal">Nuevos</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="bg-white border-orange-200 focus-visible:ring-orange-500 w-24"
                    />
                  </td>
                  <td className="px-6 py-4"><Badge className="bg-green-100 text-green-700">Activo</Badge></td>
                  <td className="px-6 py-4"><Switch checked disabled /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={handleAddItem} size="icon" className="h-8 w-8 bg-orange-600 hover:bg-orange-700 text-white">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => setIsAdding(false)} variant="outline" size="icon" className="h-8 w-8">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )}

              {/* ── ITEM ROWS ── */}
              {filteredItems.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <tr key={item.id} className={`transition-colors group ${isEditing ? 'bg-blue-50' : 'hover:bg-orange-50/50'}`}>
                    <td className="px-6 py-4 font-medium text-neutral-900">
                      {isEditing ? (
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="bg-white border-blue-300 focus-visible:ring-blue-400 h-9"
                          autoFocus
                        />
                      ) : item.name}
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 font-normal">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-neutral-900 font-medium">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="bg-white border-blue-300 focus-visible:ring-blue-400 h-9 w-24"
                        />
                      ) : `$${item.price.toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={item.is_available ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-red-100 text-red-700 hover:bg-red-100'}>
                        {item.is_available ? 'Activo' : 'Agotado'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={item.is_available}
                        onCheckedChange={() => toggleAvailability(item.id, item.is_available)}
                        className="data-[state=checked]:bg-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button onClick={saveEdit} size="icon" className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white">
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button onClick={cancelEdit} variant="outline" size="icon" className="h-8 w-8">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-2">
                          <Button onClick={() => { startEdit(item); setIsAdding(false); }} variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-blue-600 hover:bg-blue-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => confirmDelete(item.id)} variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-red-600 hover:bg-red-50">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-400">
                    No se encontraron platos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
