import { useSelector } from "react-redux";
import { useState } from "react";
import {
  DeliveryDetailesForm,
  DeliveryScheduleForm,
} from "../components/checkout/DeliveryDetailesForm";
import { RiLock2Fill } from "react-icons/ri";

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
          {deliveryDetails.address &&
          deliveryDetails.city &&
          deliveryDetails.state &&
          deliveryDetails.zipCode &&
          deliveryDetails.phone ? (
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
          <div className="border border-gray-200 rounded-lg p-5 my-4 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between  border-b pb-4 border-gray-400"
              >
                <div className="flex  gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-25 h-25 border rounded-md"
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-lg font-medium">
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">₹{item.price}/month</p>
                </div>
              </div>
            ))}
          </div>

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
        <div className="border border-gray-200 rounded-lg p-5 h-fit sticky top-20">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Order Summary
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <p>Total Items</p>
              <p className="font-medium">{summary.totalItems}</p>
            </div>
            <div className="flex justify-between">
              <p>Monthly Rent</p>
              <p className="font-medium">₹{summary.monthlyRent.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Security Deposit</p>
              <p className="font-medium">
                ₹{summary.securityDeposit.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Charges</p>
              <p className="text-green-600 font-medium">Free</p>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <p>Due Today</p>
              <p className="text-green-600">₹{summary.totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium flex justify-center gap-2 items-center">
            <RiLock2Fill size={20} />
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
