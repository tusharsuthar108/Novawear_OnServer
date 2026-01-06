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
<<<<<<< HEAD
import OrdersPage from "./pages/OrdersPage";;
=======
import OrdersPage from "./pages/OrdersPage";

import CategoryExplorer from "./components/CategoryExplorer";


>>>>>>> 13fcbe1a5025c6bc67f50d8a060d87d4eff359ac
import AdminDashboard from "./pages/admin/dashboard";
import CategoryPage from "./pages/CategoryPage";
import Tranding from "./pages/Tranding";
import AdminOrders from "./pages/admin/Orders";

<<<<<<< HEAD

import Login from "./pages/Login";
import Signup from "./pages/Signup";


=======
>>>>>>> 13fcbe1a5025c6bc67f50d8a060d87d4eff359ac
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
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/tranding" element={<Tranding />} />

          <Route path="/category-explorer" element={<CategoryExplorer />} />

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
          {/* <Route path="/admin/add-product" element={<AddProduct />} /> */}
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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