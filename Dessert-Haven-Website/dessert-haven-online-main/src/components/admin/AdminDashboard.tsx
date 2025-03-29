
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { getOrders, getMenuItems, logout } from '@/lib/db';
import MenuItemManager from './MenuItemManager';
import OrderManager from './OrderManager';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const menuItems = getMenuItems();
  const orders = getOrders();
  
  const handleLogout = () => {
    logout();
    onLogout();
  };
  
  return (
    <div className="py-8">
      <div className="cafe-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cafe-chai">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Logged in as <span className="font-semibold">{user.name}</span>
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-cafe-chai mb-2">Menu Items</h3>
            <p className="text-3xl font-bold">{menuItems.length}</p>
            <p className="text-gray-500">Total items on menu</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-cafe-chai mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold">
              {orders.filter(order => order.status === 'pending').length}
            </p>
            <p className="text-gray-500">Waiting to be processed</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-cafe-chai mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">{orders.length}</p>
            <p className="text-gray-500">All-time orders</p>
          </div>
        </div>
        
        <Tabs defaultValue="menu-items" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu-items" className="mt-6">
            <MenuItemManager />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <OrderManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
