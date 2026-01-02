import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.selectedSize === size
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { 
        ...product, 
        selectedSize: size, 
        quantity 
      }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === productId && item.selectedSize === size)
    ));
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCartItems(prev => prev.map(item =>
      item.id === productId && item.selectedSize === size
        ? { ...item, quantity }
        : item
    ));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};