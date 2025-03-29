
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { getMenuItems } from '@/lib/db';
import MenuItemCard from '@/components/menu/MenuItemCard';
import { MenuItem } from '@/types';

const Menu = () => {
  const allItems = getMenuItems();
  const [searchQuery, setSearchQuery] = useState('');
  
  const desserts = allItems.filter(item => item.category === 'dessert');
  const snacks = allItems.filter(item => item.category === 'snack');
  
  const filteredItems = (items: MenuItem[]) => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  return (
    <Layout>
      <div className="bg-cafe-cream py-12">
        <div className="cafe-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-cafe-chai mb-4">Our Menu</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our selection of authentic Indian sweets and savory snacks, made with traditional recipes.
            </p>
          </div>
          
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
              <TabsTrigger value="snacks">Snacks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {filteredItems(allItems).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems(allItems).map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No items found. Try a different search term.</p>
              )}
            </TabsContent>
            
            <TabsContent value="desserts" className="mt-6">
              {filteredItems(desserts).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems(desserts).map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No desserts found. Try a different search term.</p>
              )}
            </TabsContent>
            
            <TabsContent value="snacks" className="mt-6">
              {filteredItems(snacks).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems(snacks).map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No snacks found. Try a different search term.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
