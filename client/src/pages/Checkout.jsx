import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import {
  DeliveryDetailesForm,
  DeliveryScheduleForm,
} from "../components/checkout/DeliveryDetailesForm";

import CartCheckoutItems from "../components/checkout/CartCheckoutItems";
import OderSummary from "../components/checkout/OderSummary";

const Checkout = () => {
  const orderData = useSelector((state) => state.checkout.orderData);
  const authUser = useSelector((state) => state.auth.user);

  const savedDeliveryDetails = useMemo(() => {
    const savedAddress = authUser?.address || {};
    return {
      name: savedAddress.name || [authUser?.firstName, authUser?.lastName].filter(Boolean).join(" "),
      email: authUser?.email || "",
      phone: savedAddress.phone || "",
      address: savedAddress.address || "",
      city: savedAddress.city || "",
      state: savedAddress.state || "",
      pincode: savedAddress.pincode || "",
    };
  }, [authUser]);

  const hasSavedAddress = Boolean(
    savedDeliveryDetails.address &&
      savedDeliveryDetails.city &&
      savedDeliveryDetails.state &&
      savedDeliveryDetails.pincode,
  );

  // Lifted state for delivery forms
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [addressSource, setAddressSource] = useState("saved");
  const selectedAddressSource = hasSavedAddress ? addressSource : "manual";
  const activeDeliveryDetails =
    selectedAddressSource === "saved" ? savedDeliveryDetails : deliveryDetails;
  const [deliverySchedule, setDeliverySchedule] = useState({
    deliveryDate: "",
    preferredTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setDeliveryDetails(
      selectedAddressSource === "saved"
        ? savedDeliveryDetails
        : {
            name: formData.get("name") || "",
            phone: formData.get("phone") || "",
            address: formData.get("address") || "",
            city: formData.get("city") || "",
            state: formData.get("state") || "",
            pincode: formData.get("pincode") || "",
          },
    );
    setDeliverySchedule({
      deliveryDate: formData.get("deliveryDate") || "",
      preferredTime: formData.get("preferredTime") || "",
    });
    setIsSubmitted(true);
  };

  if (!orderData) {
    return (
      <div className="p-10 text-center">
        No order data found. Please go back to cart.
      </div>
    );
  }

  const { items, summary } = orderData;
  const apiOrderData = {
    orderItems: items,
    deliveryDetails: activeDeliveryDetails,
    deliverySchedule,
    paymentMethod: "Cash On Delivery",
    itemPrice: summary.monthlyRent,
    securityDeposit: summary.securityDeposit,
    totalPrice: summary.totalPrice,
  };
  console.log("API call is redady: ", apiOrderData);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-3">Checkout</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Delivery Details */}
          {isSubmitted || selectedAddressSource === "saved" ? (
            <div className="my-4 border border-green-200 rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <div className="space-y-2 text-gray-700">
                <p className="text-lg font-medium">Deliver to : </p>
                <p>Name : {activeDeliveryDetails.name}</p>
                <p>
                  Address : {activeDeliveryDetails.address},{" "}
                  {activeDeliveryDetails.city},
                  {activeDeliveryDetails.state}, {activeDeliveryDetails.pincode}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  <span>Phone : </span> {activeDeliveryDetails.phone}
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
          <form
            className="flex flex-col gap-4 mt-8"
            onSubmit={handleFormSubmit}
          >
            {hasSavedAddress && (
              <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery Address
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <label className="border border-gray-300 rounded-lg p-4 cursor-pointer flex gap-3">
                    <input
                      type="radio"
                      name="addressSource"
                      value="saved"
                      checked={selectedAddressSource === "saved"}
                      onChange={() => {
                        setAddressSource("saved");
                        setDeliveryDetails(savedDeliveryDetails);
                        setIsSubmitted(true);
                      }}
                    />
                    <span>
                      <span className="block font-medium text-gray-800">
                        Saved Address
                      </span>
                      <span className="block text-sm text-gray-500 mt-1">
                        {savedDeliveryDetails.address}, {savedDeliveryDetails.city}
                      </span>
                    </span>
                  </label>
                  <label className="border border-gray-300 rounded-lg p-4 cursor-pointer flex gap-3">
                    <input
                      type="radio"
                      name="addressSource"
                      value="manual"
                      checked={selectedAddressSource === "manual"}
                      onChange={() => {
                        setAddressSource("manual");
                        setIsSubmitted(false);
                      }}
                    />
                    <span className="font-medium text-gray-800">
                      Manual Address
                    </span>
                  </label>
                </div>
              </div>
            )}

            {selectedAddressSource === "manual" && (
              <DeliveryDetailesForm key="manual-address" />
            )}
            <DeliveryScheduleForm />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors self-end font-semibold shadow-sm cursor-pointer"
            >
              submmit
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <OderSummary summary={summary} apiOrderData={apiOrderData} />
      </div>
    </div>
  );
};

export default Checkout;
