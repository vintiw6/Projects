
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { getCartItems, getCartTotal, updateCartItemQuantity, clearCart, createOrder } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = getCartItems();
  const cartTotal = getCartTotal();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateCartItemQuantity(itemId, newQuantity);
      // Force a re-render by using a state update
      setIsSubmitting(prev => !prev);
    }
  };
  
  const handleRemoveItem = (itemId: string) => {
    updateCartItemQuantity(itemId, 0);
    // Force a re-render
    setIsSubmitting(prev => !prev);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const order = createOrder(customerInfo);
      
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/order-confirmation');
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Layout>
      <div className="py-12">
        <div className="cafe-container">
          <h1 className="text-3xl md:text-4xl font-bold text-cafe-chai mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Button 
                onClick={() => navigate('/menu')} 
                className="bg-cafe-spice hover:bg-cafe-spice/90"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 h-24 shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 flex-grow flex flex-col sm:flex-row sm:items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex items-center justify-between mt-4 sm:mt-0">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="ml-6 flex items-center space-x-4">
                                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => clearCart()}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary and Checkout */}
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(cartTotal * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-cafe-spice hover:bg-cafe-spice/90"
                        disabled={isSubmitting || cartItems.length === 0}
                      >
                        {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
