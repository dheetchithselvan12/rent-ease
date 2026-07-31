// import { useState } from "react";
import { useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartCard from "../components/cart/CartItems";
import CartPayment from "../components/cart/CartPayment";
import SimilarCartItems from "../components/cart/SimilarCartItems";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveCart = (productId) => {
    dispatch(removeFromCart(productId));
    console.log("product removed : ", productId);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-12 xl:px-15 lg:py-10">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-medium text-gray-800 sm:text-3xl">
          Your Cart
        </h2>
        <p className="mt-2 text-base text-gray-500 sm:text-lg">
          Review your rental items and complete your order.
        </p>
      </div>
      <section className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* left side */}
        <div className="flex w-full flex-col gap-6 lg:w-[60%]">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            {/* cart */}
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Cart Items
            </h3>
            {cartItem?.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center text-gray-500 sm:flex-row">
                <span>Your cart is empty.</span>
                <Link
                  to="/products"
                  className="rounded-md bg-gray-200 px-3 py-2 text-sm text-blue-500 transition-colors hover:bg-gray-100"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6 ">
                {cartItem?.map((item) => (
                  <CartCard
                    key={item.productId}
                    item={item}
                    handleRemoveCart={handleRemoveCart}
                  />
                ))}
              </div>
            )}
          </div>

          {/* bottom */}
          {cartItem?.length > 0 && (
            <div className="flex flex-col gap-6 h-fit">
              <SimilarCartItems />
            </div>
          )}
        </div>

        {/* right side */}
        <CartPayment />
      </section>
    </div>
  );
};

export default Cart;
