import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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


import AdminDashboard from "./pages/admin/dashboard";
import AdminOrders from "./pages/admin/Orders";



function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Navbar visible on all pages except admin routes */}
      {!isAdminRoute && <Navbar />}

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
          
          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

        
          
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;