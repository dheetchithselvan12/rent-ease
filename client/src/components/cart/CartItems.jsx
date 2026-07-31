import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../features/cart/cartSlice";

const CartCard = ({ item, handleRemoveCart }) => {
  const dispatch = useDispatch();

  console.log("cartItem Name: ", item);

  return (
    <div className="border-b border-gray-300 pb-6 last:border-b-0 last:pb-0">
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full items-center justify-between gap-4 sm:w-28 sm:flex-col sm:justify-start">
          <Link to={`/products/${item.productId}`}>
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              }
              alt={item.name}
              className="h-24 w-24 rounded-lg border border-gray-200 object-cover duration-200 hover:scale-105 hover:bg-gray-100"
            />
          </Link>
          {/* Quantity Counter */}
          <div className="font-medium sm:mt-4">
            <button
              disabled={item.quantity > 1 ? false : true}
              onClick={() => dispatch(decrementQuantity(item.productId))}
              className={` text-xl ${item.quantity > 1 ? "cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
            >
              -
            </button>
            <span className="border border-gray-300 rounded-sm px-4 py-1 mx-2">
              {item.quantity}
            </span>
            <button
              onClick={() => dispatch(incrementQuantity(item.productId))}
              className="cursor-pointer text-xl"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h6 className="text-lg font-medium text-gray-800">
                {item.title}
              </h6>
              <span className="bg-blue-500/20 px-2 font-medium rounded-full inline-block my-1 text-xs text-black">
                {item?.name}
              </span>
              <p className=" text-xs text-gray-500">{item?.description}</p>
            </div>

            <button
              onClick={() => handleRemoveCart(item?.productId)}
              className="text-red-400 hover:text-red-600 hover:bg-red-50 h-fit p-2 rounded-full transition-colors cursor-pointer"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="mt-auto flex items-center gap-2 text-sm text-gray-500">
              <FaRegCalendarAlt /> {item.tenure} Months Tenure
            </p>
            <div className="sm:text-right">
              <p className="text-2xl font-bold text-gray-800">
                ₹{item.price * item.quantity}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                ₹{item.price}/mo
              </p>
              <p className="inline text-sm text-gray-500 font-medium"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
