import { useSelector } from "react-redux";
import { useState } from "react";
import {
  DeliveryDetailesForm,
  DeliveryScheduleForm,
} from "../components/checkout/DeliveryDetailesForm";

import CartCheckoutItems from "../components/checkout/CartCheckoutItems";
import OderSummary from "../components/checkout/OderSummary";

const Checkout = () => {
  const orderData = useSelector((state) => state.checkout.orderData);

  // Lifted state for delivery forms
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [deliverySchedule, setDeliverySchedule] = useState({
    deliveryDate: "",
    preferredTime: "",
  });

  // Checkout form is empty or not and it returns boolean value
  const isFormEmpty = Object.values(deliveryDetails && deliverySchedule).every(
    (value) => value === "",
  );

  console.log("DeliveryDetailesForm: ", deliveryDetails);

  if (!orderData) {
    return (
      <div className="p-10 text-center">
        No order data found. Please go back to cart.
      </div>
    );
  }

  const { items, summary } = orderData;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-3">Checkout</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Delivery Details */}
          {!isFormEmpty ? (
            <div className="my-4 border border-green-200 rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <div className="space-y-2 text-gray-700">
                <p className="text-lg font-medium">Deliver to : </p>
                <p>Name : {deliveryDetails.name}</p>
                <p>
                  Address : {deliveryDetails.address}, {deliveryDetails.city},
                  {deliveryDetails.state}, {deliveryDetails.zipCode}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  <span>Phone : </span> {deliveryDetails.phone}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center my-4 border border-red-300 rounded-lg p-5">
              <p className="text-lg font-medium mb-2 text-red-500">
                No delivery details found.
              </p>
              <p className="text-sm text-red-500">
                Please fill in the delivery details.
              </p>
            </div>
          )}
          {/* Order Items */}
          <CartCheckoutItems items={items} />

          {/* DeliveryDetail Form */}
          <div className="flex flex-col gap-4 mt-8">
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

        {/* Order Summary */}
        <OderSummary summary={summary} />
      </div>
    </div>
  );
};

export default Checkout;
