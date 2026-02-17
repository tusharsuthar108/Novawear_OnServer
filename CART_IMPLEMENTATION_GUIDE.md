# Cart Implementation Guide

## Overview
The cart system now supports both logged-in and logged-out users:
- **Logged-in users**: Cart data is stored in the database
- **Logged-out users**: Cart data is stored in browser localStorage
- **On login**: localStorage cart automatically syncs with database

## How It Works

### For Logged-Out Users
1. Cart items are stored in browser's localStorage
2. Data persists across browser sessions
3. Cart survives page refreshes

### For Logged-In Users
1. Cart items are stored in the database
2. Cart is accessible from any device
3. Cart syncs automatically on login

### On Login
1. Any items in localStorage cart are automatically added to database
2. localStorage cart is cleared
3. User sees merged cart from both sources

## Usage in Components

```jsx
import { useCart } from '../context/CartContext';

function YourComponent() {
  const { addToCart, cartItems, removeFromCart, updateQuantity } = useCart();
  
  // Add to cart (works for both logged-in and logged-out)
  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };
  
  return (
    // Your JSX
  );
}
```

## Database Schema Required

Make sure you have these tables in your database:

```sql
-- Cart table
CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table
CREATE TABLE cart_items (
  cart_item_id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart(cart_id),
  variant_id INTEGER REFERENCES product_variants(variant_id),
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

The following endpoints are already implemented:

- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/:userId` - Get user's cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear/:userId` - Clear entire cart

## Testing

1. **Test as logged-out user:**
   - Add items to cart
   - Refresh page - items should persist
   - Close and reopen browser - items should still be there

2. **Test as logged-in user:**
   - Add items to cart
   - Items should save to database
   - Log out and log back in - items should persist

3. **Test cart sync:**
   - Log out
   - Add items to cart
   - Log in
   - Cart should contain items from before login

## Notes

- The system automatically detects if user is logged in by checking localStorage for 'userId'
- Cart operations are async for logged-in users (database calls)
- Cart operations are sync for logged-out users (localStorage)
- No code changes needed in components - CartContext handles everything
