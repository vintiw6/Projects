'use client';
import {SessionProvider} from "next-auth/react";
import {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = Number(cartProduct.basePrice);
  if (cartProduct.size) {
    price += Number(cartProduct.size.price);
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += Number(extra.price);
    }
  }
  return price.toFixed(2); 
}

export function AppProvider({children}) {
  const [cartProducts,setCartProducts] = useState([]);
  
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      try {
        const storedCart = JSON.parse(ls.getItem('cart'));
        if (Array.isArray(storedCart)) {
          setCartProducts(storedCart);
        } else {
          setCartProducts([]); // Reset if it's not an array
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartProducts([]);
      }
    }
  }, []);
  

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size=null, extras=[]) {
    setCartProducts(prevProducts => {
      const cartProduct = {...product, size, extras};
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  function removeCartProduct(indexToRemove) {
    console.log("Removing product at index:", indexToRemove);
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts
        .filter((v,index) => index !== indexToRemove);
      console.log("New cart after removal:", newCartProducts);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts,
        addToCart, removeCartProduct, clearCart,
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}