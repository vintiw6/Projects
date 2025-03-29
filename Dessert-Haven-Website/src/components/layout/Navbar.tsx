
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCart } from '@/lib/db';
import { useIsMobile } from '@/hooks/use-mobile';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive 
          ? 'text-cafe-spice font-semibold border-b-2 border-cafe-spice' 
          : 'text-foreground hover:text-cafe-spice'
        }`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Get cart item count
  const cart = getCart();
  const cartItemCount = Object.values(cart.items).reduce((sum, quantity) => sum + quantity, 0);
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];
  
  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => (
        <NavLink key={link.path} to={link.path}>
          {link.label}
        </NavLink>
      ))}
    </>
  );
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="cafe-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-cafe-spice font-spice">Dessert Haven</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="mx-6 flex items-center space-x-4">
              {renderNavLinks()}
            </nav>
          )}
          
          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-cafe-spice">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link>
            
            {/* Mobile Menu */}
            {isMobile && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                  <nav className="flex flex-col space-y-4 mt-6">
                    {renderNavLinks()}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
