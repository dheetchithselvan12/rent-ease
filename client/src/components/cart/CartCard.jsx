import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const CartCard = ({
  item,
  handleRemoveCart,
  countPlus,
  countMinus,
  countQuantity,
}) => {
  return (
    <div className="flex justify-between border-b border-gray-300 last:border-b-0 pb-6 last:pb-0">
      <div className="flex w-full gap-4">
        <div className="flex flex-col items-center w-fit">
          <Link to={`/products/${item.productId}`}>
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              }
              alt={item.title}
              className="object-cover w-25 h-25 rounded-lg border border-gray-200 hover:scale-105 duration-200 hover:bg-gray-100"
            />
          </Link>
          {/* Quantity Counter */}
          <div className="mt-4 font-medium">
            <button
              disabled={countQuantity > 1 ? false : true}
              onClick={countMinus}
              className={` text-xl ${countQuantity > 1 ? "cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
            >
              -
            </button>
            <span className="border border-gray-300 rounded-sm px-4 py-1 mx-2">
              {countQuantity}
            </span>
            <button onClick={countPlus} className="cursor-pointer text-xl">
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between">
            <div>
              <h6 className="text-lg font-medium text-gray-800">
                {item.title}
              </h6>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold w-fit mt-1">
                Living Room
              </span>
            </div>

            <button
              onClick={() => handleRemoveCart(item?.productId)}
              className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
          <div className="flex justify-between">
            <p className="flex items-center gap-2 text-gray-500 text-sm mt-auto">
              <FaRegCalendarAlt /> {item.tenure} Months Tenure
            </p>
            <p className="text-2xl font-bold text-gray-800">
              ₹{item.price * countQuantity}
              <span className="text-sm text-gray-500 font-medium">/mo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
