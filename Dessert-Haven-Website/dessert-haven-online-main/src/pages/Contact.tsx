
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="py-12">
        <div className="cafe-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-cafe-chai mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback, or want to place a special order.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="bg-cafe-cream rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-cafe-chai mb-6">Visit Our Cafe</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-cafe-spice mb-2">Address</h3>
                    <p className="text-gray-700">123 Spice Lane</p>
                    <p className="text-gray-700">Flavour District, FC 12345</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-cafe-spice mb-2">Hours</h3>
                    <p className="text-gray-700">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-700">Saturday & Sunday: 10:00 AM - 9:00 PM</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-cafe-spice mb-2">Contact</h3>
                    <p className="text-gray-700">Phone: (123) 456-7890</p>
                    <p className="text-gray-700">Email: info@desserthaven.com</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden h-96">
                {/* In a real implementation, this would be a Google Maps embed */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-600 font-semibold">Google Maps would be embedded here</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-cafe-chai mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-cafe-chai hover:bg-cafe-chai/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
