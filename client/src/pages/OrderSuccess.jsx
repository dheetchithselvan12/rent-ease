import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-10 h-dvh bg-gray-100 text-center text-gray-800 font-semibold">
      <div className="flex flex-col items-center justify-center bg-blue-100 rounded-lg p-10 pb-5 shadow-md shadow-blue-500/20">
        <IoIosCheckmarkCircleOutline size={100} color="green" />
        <h1>Order Success</h1>
        <div className="mt-4">
          <p className="text-lg">Your order has been placed successfully!</p>
          <div className="flex gap-4 justify-center items-center mt-2">
            <p
              onClick={() => navigate("/")}
              className="border border-gray-300 p-2 rounded-lg bg-gray-100 cursor-pointer text-sm font-bold text-blue-500 hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </p>
            <p
              onClick={() => navigate("/my-orders")}
              className="border border-gray-300 p-2 rounded-lg bg-gray-100 cursor-pointer text-sm font-bold text-blue-500 hover:bg-gray-50 transition-colors "
            >
              View Orders
            </p>
          </div>
        </div>
      </div>
      <p className="text-2xl font-bold mt-5  ">
        Thank you for renting with RentEase.
      </p>
    </div>
  );
};

export default OrderSuccess;
