import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 h-dvh bg-gray-100 text-center text-gray-800 font-semibold">
      <div className="flex flex-col items-center justify-center bg-blue-100 rounded-lg p-10 shadow-md shadow-blue-500/20">
        <IoIosCheckmarkCircleOutline size={100} color="green" />
        <h1>Order Success</h1>
        <p>Your order has been placed successfully!</p>
        <div className="mt-2">
          <p className="">Go to your Order page</p>
        </div>
      </div>
      <p className="text-2xl font-bold mt-5  ">Thank you for your purchase!</p>
    </div>
  );
};

export default OrderSuccess;
