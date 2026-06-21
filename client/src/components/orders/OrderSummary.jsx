import { Link } from "react-router-dom";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";
const OrderSummary = ({ data }) => {
  const arrQuantity = data?.orderItems?.map((item) => item.quantity);
  const totalQuantity = arrQuantity?.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="border border-gray-300 rounded-md bg-gray-50 w-1/2 h-fit p-5 my-2">
      <p className=" font-semibold mb-2">Order Summary</p>
      <div className="border-y border-gray-300 my-2 py-4 space-y-2 text-gray-600">
        <p className="flex justify-between">
          Number of Items
          <span className="font-medium">{data?.orderItems?.length}</span>
        </p>
        <p className="flex justify-between">
          Total Items
          <span className="font-medium">{totalQuantity}</span>
        </p>
        <p className="flex justify-between">
          Total Monthly Rent{" "}
          <span className="font-medium">₹{data?.itemPrice}</span>
        </p>
        <p className="flex justify-between">
          Security Deposit{" "}
          <span className="font-medium">₹{data?.securityDeposit}</span>
        </p>
        <p className="flex justify-between">
          Delivery <span className="font-medium text-green-500">Free</span>
        </p>
      </div>
      <div>
        <p className="flex justify-between">
          Total Due Now{" "}
          <span className="text-lg text-blue-500 font-medium">
            ₹{data?.itemPrice + data?.securityDeposit}
          </span>
        </p>
        <button className="border border-gray-200 text-gray-700 bg-blue-50 px-4 py-2 text-lg font-medium rounded-lg w-full my-4">
          Manage Subscription
        </button>
      </div>
      <div className="bg-blue-50 border border-gray-200 p-5 rounded-md space-y-1">
        <p className="flex gap-1 items-center text-blue-500 text-lg mb-2 font-medium">
          <IoIosHelpCircleOutline size={22} />
          Need help?
        </p>
        <p>Our support team is available 24/7 to assist with you rental.</p>
        <Link className="flex gap-1 items-center text-blue-500 mt-4 font-medium">
          Visit Help Center <LuArrowRight size={22} />
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
