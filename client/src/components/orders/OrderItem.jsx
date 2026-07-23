import { MdOutlineEventRepeat } from "react-icons/md";
import { Link } from "react-router-dom";
const OrderItem = ({ data }) => {
  console.log("data: ", data);

  return (
    <>
      <div className="flex flex-col border border-gray-300   bg-gray-50 my-2 rounded-md ">
        <h4 className="bg-blue-100/40 font-medium rounded-t-md p-5">
          Rental Items
        </h4>
        {data?.orderItems?.map((item) => (
          <div
            key={item._id}
            className="flex w-full gap-3 p-5 border-b border-gray-300"
          >
            <Link to={`/products/${item?.productId}`}>
              <img
                src={item?.image}
                alt="image"
                className="border w-22 h-20 rounded-md cursor-pointer "
              />
            </Link>
            <div className="flex flex-col w-full">
              <p className="text-lg font-semibold">{item?.title}</p>
              <p className="text-sm text-gray-500">
                Tenure: {item?.tenure} month tenure
              </p>
              <div className="flex justify-between w-full mt-2 ">
                <p className="flex gap-1 items-center text-blue-500">
                  <MdOutlineEventRepeat />
                  Monthly Billing
                </p>
                <p className="font-medium">
                  ₹{data?.itemPrice}
                  <span className="text-xs text-gray-500">/mo</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderItem;
