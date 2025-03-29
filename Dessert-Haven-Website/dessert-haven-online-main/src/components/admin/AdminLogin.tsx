
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/db';
import { toast } from '@/components/ui/use-toast';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const user = login(credentials.email, credentials.password);
      
      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`
        });
        onLoginSuccess(user);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-cafe-chai">Admin Login</CardTitle>
        <CardDescription>
          Sign in to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@desserthaven.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              For demo: use email "admin@desserthaven.com" and password "admin"
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-cafe-chai hover:bg-cafe-chai/90"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        <p>Protected area for authorized personnel only</p>
      </CardFooter>
    </Card>
  );
};

export default AdminLogin;
