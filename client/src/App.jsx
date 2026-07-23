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
import ActiveSubscriptions from "./pages/UserAccount-pages/ActiveSubscriptions.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Settings from "./pages/UserAccount-pages/Settings.jsx";
import { useSelector } from "react-redux";
// import AdminNavbar from "./components/navbar/AdminNavbar.jsx";
import Products from "./admin/Products.jsx";
import DeveloperMessage from "./components/common/DeveloperMessage.jsx";

const App = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const role = useSelector((state) => state.auth?.user?.role);
  console.log("User role : ", role);

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
            {role === "admin" ? (
              <>
                <Route index element={<DeveloperMessage />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<DeveloperMessage />} />
                <Route path="rentals" element={<DeveloperMessage />} />
                <Route path="customers" element={<DeveloperMessage />} />
                <Route path="settings" element={<DeveloperMessage />} />
              </>
            ) : (
              <>
                <Route index element={<UserDashboard />} />
                <Route path="orders" element={<MyOrders />} />
                <Route path="orders/:id" element={<OrderDetailes />} />
                <Route path="subscriptions" element={<ActiveSubscriptions />} />
                <Route path="settings" element={<Settings />} />
              </>
            )}
          </Route>
        </Route>

        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin/products" element={<Products />} />
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
