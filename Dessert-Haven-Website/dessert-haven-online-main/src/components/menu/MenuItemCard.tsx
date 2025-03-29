
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/types';
import { addToCart } from '@/lib/db';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const handleAddToCart = () => {
    addToCart(item.id);
  };
  
  return (
    <Card className="menu-item overflow-hidden h-full flex flex-col dark:border-gray-700">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="menu-item-image w-full h-48 object-cover"
        />
        {item.featured && (
          <div className="absolute top-2 right-2 bg-cafe-spice text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <span className="font-bold text-cafe-spice">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-cafe-chai hover:bg-cafe-chai/90"
          disabled={!item.isAvailable}
        >
          {item.isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
