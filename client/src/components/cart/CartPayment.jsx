import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutData } from "../../features/checkout/checkoutSlice.js";
import { RiLock2Fill } from "react-icons/ri";

const CartPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItem } = useSelector((state) => state.cart);

  // Calculate order summary totals
  const monthlyRent =
    cartItem?.reduce(
      (acc, item) =>
        acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0,
    ) || 0;
  const securityDeposit =
    cartItem?.reduce(
      (acc, item) =>
        acc +
        (Number(item.securityDeposit) || 0) * (Number(item.quantity) || 1),
      0,
    ) || 0;

  const dueToday = monthlyRent + securityDeposit;
  const totalItems =
    cartItem?.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0) || 0;

  const handlePayment = () => {
    if (cartItem.length === 0) return;

    const orderPayload = {
      items: cartItem,
      summary: {
        totalItems,
        monthlyRent,
        securityDeposit,
        totalPrice: dueToday,
      },
    };

    dispatch(setCheckoutData(orderPayload));
    navigate("/checkout");
    console.log("Payment Data ready for API:", orderPayload);
    // Add your API call here (e.g., axios.post('/api/orders', orderPayload))
  };

  return (
    <div className="border border-gray-200 rounded-xl h-fit p-10 w-[40%] bg-white shadow-sm flex flex-col gap-6 sticky top-20">
      <h2 className="text-2xl font-medium text-gray-800 border-b border-gray-300 pb-5">
        Order Summary
      </h2>

      <div className="flex flex-col gap-4 text-gray-600 border-b border-gray-300 pb-5">
        <div className="flex justify-between items-center">
          <p>Total Items</p>
          <span className="font-medium text-gray-800">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Monthly Rent</p>
          <span className="font-medium text-gray-800">
            ₹{monthlyRent.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p>
            Security Deposit
            <span className="text-xs text-gray-400"> (Refundable)</span>
          </p>
          <span className="font-medium text-gray-800">
            ₹{securityDeposit.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p>Delivery Charges</p>
          <span className="text-green-600 font-medium">Free</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-lg font-semibold text-gray-800">Due Today</p>
            <p className="text-xs text-gray-400 mt-1">
              Includes first month rent + deposit
            </p>
          </div>
          <p className="text-2xl font-medium text-green-600">
            ₹{dueToday.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={cartItem.length === 0}
          className={`w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/30 font-medium mt-2 flex items-center gap-2 justify-center ${cartItem.length === 0 ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <RiLock2Fill size={20} />
          Proceed to Payment
        </button>
        <p className="text-xs text-center text-gray-400">
          You won't be charged until the next step.
        </p>
      </div>
    </div>
  );
};

export default CartPayment;
