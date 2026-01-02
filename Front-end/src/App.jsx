import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductGalleryPage from "./pages/ProductGalleryPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Navbar visible on all pages */}
        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Checkout Flow */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />

          {/* Product Gallery Route */}
          <Route path="/products" element={<ProductGalleryPage />} />
          
          {/* Track Order */}
          <Route path="/track-order" element={<TrackOrderPage />} />
          
          {/* Orders */}
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;