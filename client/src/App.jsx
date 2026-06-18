import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import ProductDetailes from "./pages/ProductDetailes";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/UserAccount-pages/MyOrders.jsx";
import OrderDetailes from "./pages/UserAccount-pages/OrderDetailes.jsx";
import UserAccount from "./pages/UserAccount-pages/UserAccount.jsx";
import UserDashboard from "./pages/UserAccount-pages/UserDashboard.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetailes />} />
        <Route path="/products" element={<AllProducts />} />
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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
