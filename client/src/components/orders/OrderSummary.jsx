import { Link } from "react-router-dom";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";

const OrderSummary = ({ data }) => {
  const arrQuantity = data?.orderItems?.map((item) => item.quantity);
  const totalQuantity = arrQuantity?.reduce((acc, curr) => acc + curr, 0);
  const dueNow = (data?.itemPrice || 0) + (data?.securityDeposit || 0);

  return (
    <aside className="my-2 h-fit w-full rounded-md border border-gray-300 bg-gray-50 p-4 sm:p-5 xl:sticky xl:top-24">
      <p className="mb-2 font-semibold">Order Summary</p>
      <div className="my-2 space-y-2 border-y border-gray-300 py-4 text-gray-600">
        <p className="flex justify-between gap-4">
          Number of Items
          <span className="font-medium">{data?.orderItems?.length || 0}</span>
        </p>
        <p className="flex justify-between gap-4">
          Total Items
          <span className="font-medium">{totalQuantity || 0}</span>
        </p>
        <p className="flex justify-between gap-4">
          Total Monthly Rent
          <span className="font-medium">Rs. {data?.itemPrice || 0}</span>
        </p>
        <p className="flex justify-between gap-4">
          Security Deposit
          <span className="font-medium">Rs. {data?.securityDeposit || 0}</span>
        </p>
        <p className="flex justify-between gap-4">
          Delivery <span className="font-medium text-green-500">Free</span>
        </p>
      </div>
      <div>
        <p className="flex justify-between gap-4">
          Total Due Now
          <span className="text-lg font-medium text-blue-500">
            Rs. {dueNow}
          </span>
        </p>
        <button className="my-4 w-full rounded-lg border border-gray-200 bg-blue-50 px-4 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-blue-100 sm:text-lg">
          Manage Subscription
        </button>
      </div>
      <div className="space-y-1 rounded-md border border-gray-200 bg-blue-50 p-4 sm:p-5">
        <p className="mb-2 flex items-center gap-1 text-lg font-medium text-blue-500">
          <IoIosHelpCircleOutline size={22} />
          Need help?
        </p>
        <p>Our support team is available 24/7 to assist with your rental.</p>
        <Link className="mt-4 flex items-center gap-1 font-medium text-blue-500">
          Visit Help Center <LuArrowRight size={22} />
        </Link>
      </div>
    </aside>
  );
};

export default OrderSummary;
