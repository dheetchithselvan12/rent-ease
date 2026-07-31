import PaymentButton from "./PaymentButton";

const OderSummary = ({ summary, apiOrderData }) => {
  return (
    <>
      <div className="h-fit rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-20">
        <h2 className="text-xl font-semibold mb-4 border-b pb-3">
          Order Summary
        </h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between gap-4">
            <p>Total Items</p>
            <p className="font-medium">{summary.totalItems}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p>Monthly Rent</p>
            <p className="font-medium">₹{summary.monthlyRent.toFixed(2)}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p>Security Deposit</p>
            <p className="font-medium">₹{summary.securityDeposit.toFixed(2)}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p>Delivery Charges</p>
            <p className="text-green-600 font-medium">Free</p>
          </div>
          <div className="flex justify-between gap-4 border-t pt-3 text-lg font-bold">
            <p>Due Today</p>
            <p className="text-green-600">₹{summary.totalPrice.toFixed(2)}</p>
          </div>
        </div>
        {/* Button */}
        <PaymentButton apiOrderData={apiOrderData} />
      </div>
    </>
  );
};

export default OderSummary;
