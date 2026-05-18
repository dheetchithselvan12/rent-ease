import { useState } from "react";
import { useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import {
  DeliveryDetailesForm,
  DeliveryScheduleForm,
} from "../components/cart/DeliveryDetailesForm";
import CartCard from "../components/cart/CartCard";
import CartPayment from "../components/cart/CartPayment";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  console.log("CartIems: ", cartItem);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  console.log("Quantity: ", quantity);

  // Lifted state for delivery forms
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [deliverySchedule, setDeliverySchedule] = useState({
    deliveryDate: "",
    preferredTime: "",
  });

  const handleRemoveCart = (productId) => {
    dispatch(removeFromCart(productId));
    console.log("product removed : ", productId);
  };

  const handleQuantity = (value) => {
    setQuantity(value);
  };

  return (
    <div className="px-15 py-10 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-medium text-gray-800">Checkout</h2>
        <p className="text-gray-500 mt-2 text-lg">
          Review your rental items and complete your order.
        </p>
      </div>
      <section className="flex justify-between gap-10">
        {/* left side */}
        <div className="w-[60%] flex flex-col gap-6">
          <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
            {/* cart */}
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Your Cart
            </h3>
            {cartItem?.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                Your cart is empty.
              </div>
            ) : (
              <div className="flex flex-col gap-6 ">
                {cartItem?.map((item) => (
                  <CartCard
                    key={item.productId}
                    item={item}
                    handleRemoveCart={handleRemoveCart}
                    quantity={handleQuantity}
                  />
                ))}
              </div>
            )}
          </div>

          {/* bottom */}
          <div className="flex flex-col gap-6 h-fit">
            <DeliveryDetailesForm
              formData={deliveryDetails}
              handleChange={(e) =>
                setDeliveryDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <DeliveryScheduleForm
              scheduleData={deliverySchedule}
              handleChange={(e) =>
                setDeliverySchedule((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* right side */}
        <CartPayment
          deliveryDetails={deliveryDetails}
          deliverySchedule={deliverySchedule}
        />
      </section>
    </div>
  );
};

export default Cart;
