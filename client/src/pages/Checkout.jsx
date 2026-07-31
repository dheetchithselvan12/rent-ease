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
      name:
        savedAddress.name ||
        [authUser?.firstName, authUser?.lastName].filter(Boolean).join(" "),
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
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-10">
      <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          {/* Delivery Details */}
          {isSubmitted || selectedAddressSource === "saved" ? (
            <div className="my-4 rounded-lg border border-green-200 bg-white p-4 sm:p-5">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <div className="space-y-2 wrap-break-words text-gray-700">
                <p className="text-lg font-medium">Deliver to : </p>
                <p>Name : {activeDeliveryDetails.name}</p>
                <p>
                  Address : {activeDeliveryDetails.address},{" "}
                  {activeDeliveryDetails.city},{activeDeliveryDetails.state},{" "}
                  {activeDeliveryDetails.pincode}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  <span>Phone : </span> {activeDeliveryDetails.phone}
                </p>
              </div>
            </div>
          ) : (
            <div className="my-4 rounded-lg border border-red-300 bg-white p-4 text-center sm:p-5">
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
            className="mt-6 flex flex-col gap-4 sm:mt-8"
            onSubmit={handleFormSubmit}
          >
            {hasSavedAddress && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery Address
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer gap-3 rounded-lg border border-gray-300 p-4">
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
                        {savedDeliveryDetails.address},{" "}
                        {savedDeliveryDetails.city}
                      </span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer gap-3 rounded-lg border border-gray-300 p-4">
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
              className="w-full cursor-pointer rounded-md bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto sm:self-end sm:py-2"
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
