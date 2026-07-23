import PaymentButton from "./PaymentButton";

const OderSummary = ({ summary, apiOrderData }) => {
  return (
    <>
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
            <p className="font-medium">₹{summary.securityDeposit.toFixed(2)}</p>
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
        {/* Button */}
        <PaymentButton apiOrderData={apiOrderData} />
      </div>
    </>
  );
};

export default OderSummary;
