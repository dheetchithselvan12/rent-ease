import axios from "axios";
import { RiLock2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
const PaymentButton = ({ apiOrderData }) => {
  const { orderData } = useSelector((state) => state.checkout);
  console.log("oderPayload", orderData);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        apiOrderData,
      );
      console.log("API Response: ", response);
    } catch (error) {
      console.error(
        "Order Error:",
        error.response?.data?.message || error.message,
      );
      console.log("Sent Data:", apiOrderData);
    }
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium flex justify-center gap-2 items-center cursor-pointer"
      >
        <RiLock2Fill size={20} />
        Continue to Payment
      </button>
    </>
  );
};

export default PaymentButton;
