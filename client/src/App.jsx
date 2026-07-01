import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductDetailes from "./pages/ProductDetailes";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/UserAccount-pages/MyOrders.jsx";
import OrderDetailes from "./pages/UserAccount-pages/OrderDetailes.jsx";
import UserAccount from "./pages/UserAccount-pages/UserAccount.jsx";
import UserDashboard from "./pages/UserAccount-pages/UserDashboard.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetailes />} />
        <Route path="/products" element={<AllProducts />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-account" element={<UserAccount />}>
            <Route index element={<UserDashboard />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderDetailes />} />
            <Route
              path="subscriptions"
              element={<div> active Subscriptions</div>}
            />
            <Route path="wishlist" element={<div>Wishlist</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Route>

        {/* Public routes for authentication */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
