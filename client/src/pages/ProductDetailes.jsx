import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart, FiInfo } from "react-icons/fi";
import ProductCard from "../components/product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { setCheckoutData } from "../features/checkout/checkoutSlice";
import {
  getFirstProductImageUrl,
  getProductImageUrl,
} from "../utils/productImages";
import { API_BASE_URL } from "../config/api";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItem } = useSelector((state) => state.cart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const isInCart = cartItem.some((item) => item.productId === product?._id);

  useEffect(() => {
    const fetchProductAndSimilar = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);

        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);
        setSelectedImage(getFirstProductImageUrl(fetchedProduct.images));
        if (fetchedProduct.tenurePlans?.length > 0) {
          setSelectedPlan(fetchedProduct.tenurePlans[0]);
        }

        const similarResponse = await axios.get(
          `${API_BASE_URL}/products?category=${fetchedProduct.category}&limit=5`,
        );
        const productsArray = similarResponse.data.data || [];
        const filteredSimilar = productsArray
          .filter((p) => p._id !== id)
          .slice(0, 4);
        setSimilarProducts(filteredSimilar);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSimilar();
  }, [id]);

  const buildRentalItem = () => ({
    productId: product._id,
    name: product.name,
    title: product.title,
    description: product.description,
    image: getFirstProductImageUrl(product.images),
    tenure: selectedPlan.duration,
    price: selectedPlan.totalPrice,
    securityDeposit: product.securityDeposit,
  });

  const handleAddToCart = () => {
    dispatch(addToCart(buildRentalItem()));
    console.log("Cart Added");
  };

  const handleRentNow = () => {
    if (!product || !selectedPlan) {
      return;
    }
    const rentalItem = { ...buildRentalItem(), quantity: 1 };
    const monthlyRent = Number(rentalItem.price) || 0;
    const securityDeposit = Number(rentalItem.securityDeposit) || 0;

    dispatch(
      setCheckoutData({
        items: [rentalItem],
        summary: {
          totalItems: 1,
          monthlyRent,
          securityDeposit,
          totalPrice: monthlyRent + securityDeposit,
        },
      }),
    );

    navigate("/checkout");
  };

  if (loading) {
    return <h2 className="bg-gray-100 p-6">Loading...</h2>;
  }

  if (!product) {
    return <h2 className="bg-gray-100 p-6">Product not found</h2>;
  }

  return (
    <>
      <section className="bg-gray-100 px-4 py-6 sm:px-6 lg:px-10 xl:px-15">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative flex w-full flex-col gap-4 rounded-lg bg-white p-4 sm:gap-6 sm:p-6 lg:w-[54%] lg:p-8">
            <img
              src={selectedImage || getFirstProductImageUrl(product.images)}
              alt={product.name}
              className="aspect-4/3 w-full rounded-lg object-cover shadow-md sm:aspect-16/10 lg:aspect-4/3"
            />
            <p className="absolute right-6 top-6 w-fit max-w-[calc(100%-3rem)] rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold sm:right-10 sm:top-10">
              {product.name}
            </p>
            <div className="custom-scrollbar flex w-full cursor-pointer gap-3 overflow-x-auto pb-1 sm:gap-4">
              {product.images?.map((image, index) => {
                const imageUrl = getProductImageUrl(image);

                return imageUrl ? (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${product.name} ${index + 1}`}
                    onClick={() => setSelectedImage(imageUrl)}
                    className={`h-20 w-20 shrink-0 rounded-md border bg-gray-300 object-cover sm:h-28 sm:w-28 lg:h-32 lg:w-32 xl:h-40 xl:w-40 ${
                      selectedImage === imageUrl
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-slate-300"
                    }`}
                  />
                ) : null;
              })}
            </div>
          </div>

          <div className="h-fit w-full rounded-lg bg-white p-4 sm:p-6 lg:w-[42%] lg:px-8">
            <div className="custom-scrollbar lg:max-h-130 lg:overflow-y-auto lg:pr-1">
              <div className="rounded-lg bg-gray-100 p-4">
                <p className="mb-4 inline rounded-full bg-blue-400/20 px-3 py-1 text-sm text-black capitalize">
                  {product.category}
                </p>
                <h1 className="text-2xl font-medium text-gray-950 sm:text-3xl xl:text-4xl">
                  {product.title}
                </h1>
                <p className="mt-3 text-gray-700">{product.description}</p>
              </div>

              <div className="mt-5 rounded-lg bg-gray-100 p-4">
                <h3 className="font-semibold">Security Deposit</h3>
                <div className="mt-3 flex flex-col gap-2 rounded-lg bg-gray-50 p-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-1 text-gray-600">
                    <FiInfo />
                    Refund after rent expired.
                  </p>
                  <p className="text-lg text-green-600">
                    Rs.{product.securityDeposit}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-gray-100 p-4">
                <h3 className="mb-3 font-semibold">Rental Plans</h3>

                <div className="relative">
                  <div
                    className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-blue-400"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedPlan ? (
                      <span className="font-medium">
                        {selectedPlan.duration} Months - Rs.
                        {selectedPlan.pricePerMonth}/month
                      </span>
                    ) : (
                      <span className="text-gray-400">Select a plan</span>
                    )}
                    <span
                      className={`text-xs text-gray-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    >
                      v
                    </span>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                      {product.tenurePlans?.map((plan) => (
                        <div
                          key={plan.duration}
                          className={`cursor-pointer border-b border-l-4 p-3 transition-colors last:border-b-0 hover:bg-blue-50 ${
                            selectedPlan?.duration === plan.duration
                              ? "border-l-blue-500 bg-blue-50"
                              : "border-l-transparent"
                          }`}
                          onClick={() => {
                            setSelectedPlan(plan);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">
                              {plan.duration} Months
                            </span>
                            <span className="font-bold text-blue-600">
                              Rs.{plan.totalPrice}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Rs.{plan.pricePerMonth}/month
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {selectedPlan && (
                <div className="mt-4 rounded-lg bg-gray-100 p-4">
                  <p className="font-medium">Summary</p>
                  <div className="mt-2 flex flex-col gap-2 text-gray-700">
                    <p className="flex justify-between gap-3">
                      Duration <span>{selectedPlan.duration} Months</span>
                    </p>
                    <p className="flex justify-between gap-3">
                      Security Deposit <span>Rs.{product.securityDeposit}</span>
                    </p>
                    <p className="flex justify-between gap-3">
                      Selected Plan<span>Rs.{selectedPlan.totalPrice}</span>
                    </p>

                    <hr />
                    <p className="flex flex-col justify-between gap-1 text-lg min-[420px]:flex-row">
                      Total Amount
                      <span className="text-xl font-bold text-green-500">
                        Rs.{product.securityDeposit + selectedPlan.totalPrice}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleRentNow}
                className="mt-6 w-full cursor-pointer rounded-lg bg-blue-500 py-3 text-white transition hover:bg-blue-600 lg:mt-8"
              >
                Rent Now
              </button>

              <button
                onClick={isInCart ? undefined : handleAddToCart}
                disabled={isInCart}
                className={`flex w-full items-center justify-center gap-3 rounded-lg px-4 py-2 text-white transition ${isInCart ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-500 hover:bg-blue-600"}`}
              >
                <FiShoppingCart size={20} />
                {isInCart ? "Already in Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-8 sm:px-6 lg:px-10 xl:px-15">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h1 className="mb-6 text-2xl font-bold">Similar Items</h1>
            <Link
              to="/products"
              className="cursor-pointer text-blue-500 hover:text-blue-600"
            >
              View All
            </Link>
          </div>
          {similarProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
              {similarProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No similar products found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
