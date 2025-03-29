
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getMenuItems, deleteMenuItem } from '@/lib/db';
import { MenuItem } from '@/types';
import MenuItemForm from './MenuItemForm';

const MenuItemManager = () => {
  const [menuItems, setMenuItems] = useState(getMenuItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const refreshMenuItems = () => {
    setMenuItems(getMenuItems());
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(id);
      refreshMenuItems();
    }
  };
  
  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };
  
  const filteredItems = menuItems.filter(
    item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Button 
          onClick={() => {
            setEditingItem(null);
            setIsAddModalOpen(true);
          }}
          className="bg-cafe-spice hover:bg-cafe-spice/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
        
        <Input
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>
      
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-cafe-chai mb-6">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h2>
            
            <MenuItemForm 
              existingItem={editingItem}
              onComplete={() => {
                setIsAddModalOpen(false);
                refreshMenuItems();
              }}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No menu items found. Try a different search or add new items.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white hover:bg-gray-100"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white hover:bg-red-50 text-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {!item.isAvailable && (
                  <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-center py-1 text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-bold text-cafe-spice">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded ${
                    item.category === 'dessert' 
                      ? 'bg-pink-100 text-pink-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.category === 'dessert' ? 'Dessert' : 'Snack'}
                  </span>
                  {item.featured && (
                    <span className="px-2 py-1 rounded bg-cafe-cream text-cafe-chai">
                      Featured
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemManager;
