import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";

const CartCard = ({ item, handleRemoveCart }) => {
  return (
    <div className="flex justify-between border-b border-gray-300 last:border-b-0 pb-6 last:pb-0">
      <div className="flex gap-5">
        <img
          src={
            item.image ||
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          }
          alt={item.title}
          className="object-cover w-32 h-32 rounded-lg border border-gray-100"
        />
        <div className="flex flex-col gap-1 py-1">
          <h6 className="text-lg font-medium text-gray-800">{item.title}</h6>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold w-fit mt-1">
            Living Room
          </span>
          <p className="flex items-center gap-2 text-gray-500 text-sm mt-auto">
            <FaRegCalendarAlt /> {item.tenure} Months Tenure
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between py-1">
        <button
          onClick={() => handleRemoveCart(item?.productId)}
          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer"
        >
          <RiDeleteBinLine size={20} />
        </button>
        <p className="text-2xl font-bold text-gray-800">
          ₹{item.price}
          <span className="text-sm text-gray-500 font-medium">/mo</span>
        </p>
      </div>
    </div>
  );
};

export default CartCard;
