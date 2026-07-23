import { Link } from "react-router-dom";
import { getFirstProductImageUrl } from "../../utils/productImages";

const ProductCard = ({ product }) => {
  // get lowest price;
  const lowestPlan = product.tenurePlans?.[0];
  const imageUrl =
    getFirstProductImageUrl(product.images) || "https://picsum.photos/200/300";

  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl"
      />

      {/* Content */}
      <div className="mt-3">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-sm text-gray-500 capitalize">{product.category}</p>

        {/* Price */}
        <p className="text-green-600 font-bold mt-2">
          ₹{lowestPlan?.pricePerMonth}/month
        </p>

        {/* Button */}
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
          Rent Now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
