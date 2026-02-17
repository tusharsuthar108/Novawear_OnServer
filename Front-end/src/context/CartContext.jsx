import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';

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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    
    if (storedUserId) {
      loadCartFromDB(storedUserId);
    } else {
      loadCartFromLocalStorage();
    }
  }, []);

  const loadCartFromDB = async (uid) => {
    try {
      const response = await cartService.getCart(uid);
      if (response.success) {
        setCartItems(response.data.map(item => ({
          id: item.product_id,
          variant_id: item.variant_id,
          cart_item_id: item.cart_item_id,
          name: item.product_name,
          price: parseFloat(item.discount_price || item.price),
          selectedSize: item.size_name,
          quantity: item.quantity,
          images: [item.image_url],
          brand: item.brand_name
        })));
      }
    } catch (error) {
      console.error('Error loading cart from DB:', error);
    }
  };

  const loadCartFromLocalStorage = () => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = async (product, size, quantity = 1) => {
    const productId = product.product_id || product.id;
    
    if (userId) {
      try {
        const variant = product.variants?.find(v => v.size_name === size) || product.variants?.[0];
        if (!variant) return;
        
        await cartService.addToCart(userId, variant.variant_id, quantity);
        await loadCartFromDB(userId);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      setCartItems(prev => {
        const existingItem = prev.find(item => 
          item.id === productId && item.selectedSize === size
        );
        
        let newCart;
        if (existingItem) {
          newCart = prev.map(item =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCart = [...prev, { 
            id: productId,
            name: product.name,
            price: product.price,
            images: product.images,
            brand: product.brand || product.brand_name,
            selectedSize: size, 
            quantity 
          }];
        }
        saveToLocalStorage(newCart);
        return newCart;
      });
    }
  };

  const removeFromCart = async (productId, size) => {
    if (userId) {
      try {
        const item = cartItems.find(i => i.id === productId && i.selectedSize === size);
        if (item?.cart_item_id) {
          await cartService.removeFromCart(item.cart_item_id);
          await loadCartFromDB(userId);
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setCartItems(prev => {
        const newCart = prev.filter(item => 
          !(item.id === productId && item.selectedSize === size)
        );
        saveToLocalStorage(newCart);
        return newCart;
      });
    }
  };

  const updateQuantity = async (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    if (userId) {
      try {
        const item = cartItems.find(i => i.id === productId && i.selectedSize === size);
        if (item?.cart_item_id) {
          await cartService.updateCartItem(item.cart_item_id, quantity);
          await loadCartFromDB(userId);
        }
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    } else {
      setCartItems(prev => {
        const newCart = prev.map(item =>
          item.id === productId && item.selectedSize === size
            ? { ...item, quantity }
            : item
        );
        saveToLocalStorage(newCart);
        return newCart;
      });
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = async () => {
    if (userId) {
      try {
        await cartService.clearCart(userId);
        setCartItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  const syncCartOnLogin = async (uid) => {
    setUserId(uid);
    
    // Get localStorage cart before clearing
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Clear current cart items to prevent showing previous user's cart
    setCartItems([]);
    
    // Sync localStorage cart to database if exists
    if (localCart.length > 0) {
      for (const item of localCart) {
        try {
          await cartService.addToCart(uid, item.variant_id || 1, item.quantity);
        } catch (error) {
          console.error('Error syncing cart item:', error);
        }
      }
      localStorage.removeItem('cart');
    }
    
    // Load the user's cart from database
    await loadCartFromDB(uid);
  };

  const handleLogout = () => {
    setUserId(null);
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart,
      syncCartOnLogin,
      handleLogout
    }}>
      {children}
    </CartContext.Provider>
  );
};