import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";

const SimilarCartItems = () => {
  // const { cartItem } = useSelector((state) => state.cart);
  const { items: product } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleToCart = (item) => {
    dispatch(
      addToCart({
        productId: item._id,
        name: item.name,
        title: item.title,
        description: item.description,
        image: item.images?.[0]?.url,
        tenure: item.tenurePlans?.[0]?.duration,
        price: item.tenurePlans?.[0]?.pricePerMonth,
        securityDeposit: item?.securityDeposit,
      }),
    );
  };

  return (
    <div className="my-20 bg-gray-50 px-7 pt-5 rounded-lg shadow-md">
      <h1 className="text-xl font-medium">similar Items</h1>
      <div className="grid grid-cols-4 overflow-x-auto gap-2">
        {product?.slice(0, 4).map((items) => (
          <div
            key={items._id}
            className="border border-slate-300 bg-gray-100 w-45 my-10 rounded-md"
          >
            <Link to={`/products/${items._id}`}>
              <img
                src={items?.images[0]?.url}
                alt="img"
                className="w-full h-25  bg-gray-50 rounded-t-lg"
              />
            </Link>
            <div className="my-2 text-sm px-2">
              <p>{items?.title}</p>
              <p className="text-xs font-medium py-2">
                ₹{items?.tenurePlans[0]?.pricePerMonth}
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => handleToCart(items)}
                  className="border rounded-sm py-1 text-center cursor-pointer border-blue-600 text-blue-500 hover:text-blue-600 "
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarCartItems;
