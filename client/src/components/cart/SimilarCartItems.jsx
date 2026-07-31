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
    <div className="my-10 rounded-lg bg-gray-50 px-4 py-5 shadow-md sm:my-20 sm:px-7">
      <h1 className="text-xl font-medium">similar Items</h1>
      <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 xl:grid-cols-4">
        {product?.slice(0, 4).map((items) => (
          <div
            key={items._id}
            className="w-full rounded-md border border-slate-300 bg-gray-100"
          >
            <Link to={`/products/${items._id}`}>
              <img
                src={items?.images[0]?.url}
                alt="img"
                className="h-32 w-full rounded-t-lg bg-gray-50 object-cover"
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
