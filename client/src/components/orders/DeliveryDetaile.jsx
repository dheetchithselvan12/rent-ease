import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";
export const DeliveryDetaile = ({ data }) => {
  return (
    <div className="my-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Shipping address */}
      <div className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 sm:p-5">
        <h1 className="flex items-center gap-1 text-sm font-semibold text-blue-500">
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
      <div className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 sm:p-5">
        <h1 className="flex items-center text-sm font-semibold gap-1 text-blue-500">
          <MdOutlinePayments size={20} />
          PAYMENT METHOD
        </h1>
        <div className="my-4 rounded-md border border-gray-200 bg-blue-100/50">
          <div className="flex items-center gap-2 p-4">
            <p className="h-fit rounded-md bg-gray-700 px-4 py-2 text-sm text-white">
              VISA
            </p>
            <div className="min-w-0">
              <p className="font-bold">Visa ending in 4242</p>
              <p className="text-sm text-gray-700">Expires 12/26</p>
            </div>
          </div>
        </div>
        <p>Billing Address</p>
        <p>Same as shipping address</p>
      </div>
    </div>
  );
};
