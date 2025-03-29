
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="cafe-container max-w-2xl mx-auto text-center">
          <div className="mb-6 text-cafe-spice">
            <CheckCircle className="mx-auto h-16 w-16" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-cafe-chai mb-4">Thank You for Your Order!</h1>
          
          <div className="bg-cafe-cream rounded-lg p-8 mb-8">
            <p className="text-lg mb-6">
              Your order has been successfully placed and is being prepared.
            </p>
            
            <p className="mb-2">
              We've sent a confirmation email to your provided email address.
            </p>
            
            <p className="mb-6">
              You will receive a notification when your order is ready for pickup.
            </p>
            
            <div className="text-left bg-white p-4 rounded-md mb-6">
              <h2 className="font-bold text-cafe-chai mb-2">Pickup Information:</h2>
              <p>Dessert Haven</p>
              <p>123 Spice Lane</p>
              <p>Flavour District, FC 12345</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            
            <p className="text-sm text-gray-600">
              If you have any questions about your order, please contact us with your order number.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-cafe-chai hover:bg-cafe-chai/90">
              <Link to="/">Return to Home</Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/menu">Order More</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
