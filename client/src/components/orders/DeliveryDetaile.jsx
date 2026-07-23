import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";
export const DeliveryDetaile = ({ data }) => {
  return (
    <div className=" flex gap-5  my-7">
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
        <div className="border border-gray-200 bg-blue-100/50 my-4 rounded-md">
          <div className="flex gap-2 p-4 items-center">
            <p className="bg-gray-700 text-white rounded-md h-fit px-4 py-2 text-sm">
              VISA
            </p>
            <div>
              <p className="font-bold">Visa ending in 4242</p>
              <p className="text-sm text text-gray-700">Expires 12/26</p>
            </div>
          </div>
        </div>
        <p>Billing Address</p>
        <p>Same as shipping address</p>
      </div>
    </div>
  );
};
