
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MenuItem } from '@/types';
import { addMenuItem, updateMenuItem } from '@/lib/db';

interface MenuItemFormProps {
  existingItem?: MenuItem | null;
  onComplete: () => void;
  onCancel: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ 
  existingItem = null, 
  onComplete, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: existingItem?.name || '',
    description: existingItem?.description || '',
    price: existingItem?.price || 0,
    image: existingItem?.image || '',
    category: existingItem?.category || 'dessert',
    featured: existingItem?.featured || false,
    isAvailable: existingItem?.isAvailable ?? true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleCategoryChange = (value: 'dessert' | 'snack') => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (existingItem) {
        updateMenuItem({
          id: existingItem.id,
          ...formData
        });
      } else {
        addMenuItem(formData);
      }
      onComplete();
    } catch (error) {
      console.error('Error saving menu item:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleTextChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleTextChange}
          required
          className="min-h-32"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleNumberChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleTextChange}
          required
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <div className="mt-2 rounded-md overflow-hidden h-32 w-32">
            <img 
              src={formData.image} 
              alt="Preview" 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/300x300?text=Image+Error';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Category</Label>
        <RadioGroup 
          value={formData.category}
          onValueChange={(value) => handleCategoryChange(value as 'dessert' | 'snack')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dessert" id="dessert" />
            <Label htmlFor="dessert">Dessert</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="snack" id="snack" />
            <Label htmlFor="snack">Snack</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="featured" 
          checked={formData.featured}
          onCheckedChange={(checked) => handleCheckboxChange('featured', !!checked)}
        />
        <Label htmlFor="featured">Featured item (show on homepage)</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="isAvailable" 
          checked={formData.isAvailable}
          onCheckedChange={(checked) => handleCheckboxChange('isAvailable', !!checked)}
        />
        <Label htmlFor="isAvailable">Available for ordering</Label>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-cafe-chai hover:bg-cafe-chai/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : existingItem ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};

export default MenuItemForm;
