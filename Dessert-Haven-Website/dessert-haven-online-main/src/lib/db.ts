
import { MenuItem, Order, User } from '@/types';
import { toast } from '@/components/ui/use-toast';

const STORAGE_PREFIX = 'dessert-haven-';

// Mock menu items
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in sugar syrup flavored with cardamom and rose water.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1589269256264-b9e49d6b6513?q=80&w=640',
    category: 'dessert',
    featured: true,
    isAvailable: true
  },
  {
    id: '2',
    name: 'Jalebi',
    description: 'Crispy, juicy, and sweet funnel cake-like dessert soaked in saffron syrup.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1605548587049-3d8ffed449b7?q=80&w=640',
    category: 'dessert',
    featured: true,
    isAvailable: true
  },
  {
    id: '3',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes, peas, and sometimes meat.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=640',
    category: 'snack',
    featured: true,
    isAvailable: true
  },
  {
    id: '4',
    name: 'Rasmalai',
    description: 'Soft cheese patties soaked in creamy, sweetened, thickened milk delicately flavored with cardamom.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1606050309588-339302d90efc?q=80&w=640',
    category: 'dessert',
    featured: false,
    isAvailable: true
  },
  {
    id: '5',
    name: 'Pani Puri',
    description: 'Hollow crisp fried dough balls filled with spicy, tangy water, potato, chickpeas, and spices.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=640',
    category: 'snack',
    featured: false,
    isAvailable: true
  },
  {
    id: '6',
    name: 'Kaju Katli',
    description: 'Diamond-shaped cashew fudge with a thin silver layer on top.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1590080669222-99352030701a?q=80&w=640',
    category: 'dessert',
    featured: false,
    isAvailable: true
  },
  {
    id: '7',
    name: 'Veg Momos',
    description: 'Steamed dumplings filled with mixed vegetables, served with spicy chutney.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1624374984115-922c93193c78?q=80&w=640',
    category: 'snack',
    featured: true,
    isAvailable: true
  },
  {
    id: '8',
    name: 'Chicken Momos',
    description: 'Steamed dumplings filled with spiced minced chicken, served with hot garlic sauce.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1632397387151-2f5cd116a7a0?q=80&w=640',
    category: 'snack',
    featured: false,
    isAvailable: true
  },
  {
    id: '9',
    name: 'Gobi Manchurian',
    description: 'Crispy cauliflower florets tossed in a spicy, sweet, and tangy Indo-Chinese sauce.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?q=80&w=640',
    category: 'snack',
    featured: true,
    isAvailable: true
  },
  {
    id: '10',
    name: 'Chilli Paneer',
    description: 'Stir-fried cottage cheese cubes with bell peppers, onions, and spicy Indo-Chinese sauce.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1631452180775-7c5d27661aaf?q=80&w=640',
    category: 'snack',
    featured: false,
    isAvailable: true
  },
  {
    id: '11',
    name: 'Hakka Noodles',
    description: 'Stir-fried noodles with vegetables and Indo-Chinese spices.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=640',
    category: 'snack',
    featured: false,
    isAvailable: true
  },
  {
    id: '12',
    name: 'Ghevar',
    description: 'Traditional Rajasthani disc-shaped sweet cake made with flour and soaked in sugar syrup.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1626415600798-d5dc20be3690?q=80&w=640',
    category: 'dessert',
    featured: true,
    isAvailable: true
  },
  {
    id: '13',
    name: 'Balushahi',
    description: 'Traditional Rajasthani sweet similar to a glazed doughnut, but with a flaky texture.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1597576000950-0a841c0066b7?q=80&w=640',
    category: 'dessert',
    featured: false,
    isAvailable: true
  },
  {
    id: '14',
    name: 'Malpua',
    description: 'Sweet pancakes dipped in sugar syrup, a traditional Rajasthani dessert.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1631788012442-633e27a702f5?q=80&w=640',
    category: 'dessert',
    featured: false,
    isAvailable: true
  },
  {
    id: '15',
    name: 'Schezwan Fried Rice',
    description: 'Spicy Indo-Chinese rice dish with vegetables and Schezwan sauce.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?q=80&w=640',
    category: 'snack',
    featured: false,
    isAvailable: true
  }
];

// Mock admin user
const initialAdminUser: User = {
  id: 'admin-1',
  email: 'admin@desserthaven.com',
  name: 'Admin',
  role: 'admin'
};

// Helper functions to interact with localStorage
const getStoredData = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  
  try {
    const storedValue = localStorage.getItem(STORAGE_PREFIX + key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return fallback;
  }
};

const setStoredData = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
};

// Menu item functions
export const getMenuItems = (): MenuItem[] => {
  return getStoredData<MenuItem[]>('menu-items', initialMenuItems);
};

export const getMenuItem = (id: string): MenuItem | undefined => {
  const items = getMenuItems();
  return items.find(item => item.id === id);
};

export const addMenuItem = (item: Omit<MenuItem, 'id'>): MenuItem => {
  const items = getMenuItems();
  const newItem = {
    ...item,
    id: Date.now().toString()
  };
  
  setStoredData('menu-items', [...items, newItem]);
  toast({
    title: 'Menu Item Added',
    description: `${newItem.name} has been added to the menu.`
  });
  
  return newItem;
};

export const updateMenuItem = (item: MenuItem): void => {
  const items = getMenuItems();
  const updatedItems = items.map(i => i.id === item.id ? item : i);
  
  setStoredData('menu-items', updatedItems);
  toast({
    title: 'Menu Item Updated',
    description: `${item.name} has been updated.`
  });
};

export const deleteMenuItem = (id: string): void => {
  const items = getMenuItems();
  const itemToDelete = items.find(item => item.id === id);
  const filteredItems = items.filter(item => item.id !== id);
  
  setStoredData('menu-items', filteredItems);
  
  if (itemToDelete) {
    toast({
      title: 'Menu Item Deleted',
      description: `${itemToDelete.name} has been removed from the menu.`
    });
  }
};

// Auth functions
export const login = (email: string, password: string): User | null => {
  // In a real app, this would call an API
  // For demo purposes, we'll just check against our mock admin
  if (email === initialAdminUser.email && password === 'admin') {
    const user = getStoredData<User>('current-user', initialAdminUser);
    setStoredData('current-user', user);
    return user;
  }
  return null;
};

export const logout = (): void => {
  setStoredData('current-user', null);
};

export const getCurrentUser = (): User | null => {
  return getStoredData<User | null>('current-user', null);
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

// Cart functions
export const getCart = (): { items: Record<string, number> } => {
  return getStoredData('cart', { items: {} });
};

export const addToCart = (itemId: string, quantity: number = 1): void => {
  const cart = getCart();
  const currentQuantity = cart.items[itemId] || 0;
  cart.items[itemId] = currentQuantity + quantity;
  
  setStoredData('cart', cart);
  
  const item = getMenuItem(itemId);
  if (item) {
    toast({
      title: 'Added to Cart',
      description: `${quantity} ${item.name}${quantity > 1 ? 's' : ''} added to your cart.`
    });
  }
};

export const updateCartItemQuantity = (itemId: string, quantity: number): void => {
  const cart = getCart();
  
  if (quantity <= 0) {
    delete cart.items[itemId];
  } else {
    cart.items[itemId] = quantity;
  }
  
  setStoredData('cart', cart);
};

export const clearCart = (): void => {
  setStoredData('cart', { items: {} });
};

export const getCartItems = () => {
  const cart = getCart();
  const menuItems = getMenuItems();
  
  return Object.entries(cart.items).map(([itemId, quantity]) => {
    const menuItem = menuItems.find(item => item.id === itemId);
    if (!menuItem) return null;
    
    return {
      ...menuItem,
      quantity
    };
  }).filter(Boolean);
};

export const getCartTotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => {
    if (!item) return total;
    return total + item.price * item.quantity;
  }, 0);
};

// Order functions
export const getOrders = (): Order[] => {
  return getStoredData<Order[]>('orders', []);
};

export const createOrder = (customerInfo: { name: string; email: string; phone: string }): Order => {
  const cartItems = getCartItems();
  const orders = getOrders();
  
  const newOrder: Order = {
    id: `order-${Date.now()}`,
    items: cartItems,
    total: getCartTotal(),
    customerName: customerInfo.name,
    customerEmail: customerInfo.email,
    customerPhone: customerInfo.phone,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  setStoredData('orders', [...orders, newOrder]);
  clearCart();
  
  toast({
    title: 'Order Placed Successfully',
    description: `Your order #${newOrder.id} has been placed and is being prepared.`
  });
  
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  const orders = getOrders();
  const updatedOrders = orders.map(order => 
    order.id === orderId ? { ...order, status } : order
  );
  
  setStoredData('orders', updatedOrders);
  
  toast({
    title: 'Order Status Updated',
    description: `Order #${orderId} status changed to ${status}.`
  });
};
