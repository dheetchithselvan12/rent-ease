import { MdOutlineEventRepeat } from "react-icons/md";
import { Link } from "react-router-dom";

const OrderItem = ({ data }) => {
  return (
    <div className="my-2 flex flex-col rounded-md border border-gray-300 bg-gray-50">
      <h4 className="rounded-t-md bg-blue-100/40 p-4 font-medium sm:p-5">
        Rental Items
      </h4>
      {data?.orderItems?.map((item) => (
        <div
          key={item._id}
          className="flex w-full flex-col gap-3 border-b border-gray-300 p-4 sm:flex-row sm:p-5"
        >
          <Link to={`/products/${item?.productId}`} className="shrink-0">
            <img
              src={item?.image}
              alt="image"
              className="h-36 w-full cursor-pointer rounded-md border object-cover sm:h-20 sm:w-22"
            />
          </Link>
          <div className="flex min-w-0 flex-col">
            <p className="break-words text-lg font-semibold">{item?.title}</p>
            <p className="text-sm text-gray-500">
              Tenure: {item?.tenure} month tenure
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-1 text-blue-500">
                <MdOutlineEventRepeat />
                Monthly Billing
              </p>
              <p className="font-medium">
                Rs. {data?.itemPrice}
                <span className="text-xs text-gray-500">/mo</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
