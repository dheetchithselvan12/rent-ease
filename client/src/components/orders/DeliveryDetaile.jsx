import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";
export const DeliveryDetaile = ({ data }) => {
  return (
    <div className=" flex gap-5 w-1/2 my-7">
      {/* Shipping address */}
      <div className="border border-gray-300 bg-gray-50 p-5 rounded-md w-full">
        <h1 className=" flex items-center text-sm font-semibold gap-1 text-blue-500 ">
          <CiLocationOn size={20} />
          SHIPPING ADDRESS
        </h1>
        <div className="mt-3 text-gray-600">
          <p className="text-black text-lg font-semibold">
            {data?.deliveryDetails?.name}
          </p>
          <p>{data?.deliveryDetails?.address}</p>
          <p>{data?.deliveryDetails?.city}</p>
          <p>{data?.deliveryDetails?.state}</p>
          <p>{data?.deliveryDetails?.zipCode}</p>
          <p className="mt-4">Phone : {data?.deliveryDetails?.phone}</p>
        </div>
      </div>

      {/* Payment Detailes */}
      <div className="border border-gray-300 bg-gray-50 p-5 rounded-md w-full">
        <h1 className="flex items-center text-sm font-semibold gap-1 text-blue-500">
          <MdOutlinePayments size={20} />
          PAYMENT METHOD
        </h1>
      </div>
    </div>
  );
};
