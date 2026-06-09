import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetailes from "./pages/ProductDetailes";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetailes from "./pages/OrderDetailes";
import UserAccount from "./pages/UserAccount";

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
        {/* <Route path="/my-orders" element={<MyOrders />} /> */}
        <Route path="/orders/:id" element={<OrderDetailes />} />
        <Route path="/my-account" element={<UserAccount />}>
          <Route index element={<div>Dashboard overview</div>} />
          <Route path="orders" element={<MyOrders />}>
            <Route path=":id" element={<OrderDetailes />} />
          </Route>
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
