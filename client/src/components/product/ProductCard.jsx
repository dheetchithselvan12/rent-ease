import { Link } from "react-router-dom";
import { getFirstProductImageUrl } from "../../utils/productImages";

const ProductCard = ({ product }) => {
  const lowestPlan = product.tenurePlans?.[0];
  const imageUrl =
    getFirstProductImageUrl(product.images) || "https://picsum.photos/200/300";

  return (
    <Link
      to={`/products/${product._id}`}
      className="flex h-full flex-col rounded-lg bg-white p-3 shadow-md transition hover:shadow-lg sm:p-4"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="h-40 w-full rounded-md object-cover sm:h-44 lg:h-40"
      />

      <div className="mt-3 flex flex-1 flex-col">
        <h2 className="line-clamp-2 text-base font-semibold text-gray-950 sm:text-lg">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 capitalize">{product.category}</p>

        <p className="mt-2 font-bold text-green-600">
          Rs.{lowestPlan?.pricePerMonth}/month
        </p>

        <button className="mt-auto w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700">
          Rent Now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
