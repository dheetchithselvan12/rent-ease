import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart, FiInfo } from "react-icons/fi";
import ProductCard from "../components/product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const isInCart = cartItem.some((item) => item.productId === product?._id);

  useEffect(() => {
    const fetchProductAndSimilar = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );

        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);
        if (response.data?.tenurePlans?.length > 0) {
          setSelectedPlan(response.data.data.tenurePlans[0]);
        }

        // Fetch similar products based on category
        const similarResponse = await axios.get(
          `http://localhost:5000/api/products?category=${fetchedProduct.category}&limit=5`,
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

  // Add to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        title: product.title,
        description: product.description,
        image: product.images[0],
        tenure: selectedPlan.duration,
        price: selectedPlan.totalPrice,
        securityDeposit: product.securityDeposit,
      }),
    );
    console.log("Cart Added");
  };

  if (loading) {
    return <h2 className="p-6">Loading...</h2>;
  }

  if (!product) {
    return <h2 className="p-6">Product not found</h2>;
  }

  return (
    <>
      <section className="px-15 py-10 bg-gray-100">
        <div className="flex justify-between  ">
          {/* LEFT IMAGE */}
          <div className="relative flex flex-col gap-8 w-[54%] bg-white px-8 py-8 rounded-xl">
            <img
              src={"https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
              alt={product.name}
              className=" rounded-2xl shadow-md"
            />
            <p className=" absolute top-10 right-10 bg-blue-500/20 rounded-full px-3 py-1 w-fit text-xs font-bold">
              {product.name}
            </p>
            <div className="flex gap-4 w-full cursor-pointer ">
              <img
                className="w-40 h-40 bg-gray-300 rounded-md"
                src={
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                }
              />
              <img
                className="w-40 h-40 bg-gray-300 rounded-md"
                src={
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                }
              />
              <img
                className="w-40 h-40 bg-gray-300 rounded-md"
                src={
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                }
              />
              <img
                className="w-40 h-40 bg-gray-300 rounded-md"
                src={
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                }
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-white  rounded-xl px-8 py-6 w-[42%]  h-fit ">
            <div className="h-130 overflow-y-auto custom-scrollbar ">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-black mb-4 capitalize bg-blue-400/20 inline px-3 py-1 text-sm rounded-full">
                  {product.category}
                </p>
                <h1 className="text-4xl font-medium">{product.title}</h1>
                <p className="mt-3 text-gray-700">{product.description}</p>
              </div>

              {/* Deposit */}
              <div className="mt-5 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold">Security Deposit</h3>
                <div className="flex justify-between bg-gray-50 p-2 rounded-lg mt-3">
                  <p className="flex gap-1 items-center text-gray-600 ">
                    <FiInfo />
                    Refund after rent expired.
                  </p>
                  <p className="text-lg mt-3 text-green-600  ">
                    ₹{product.securityDeposit}
                  </p>
                </div>
              </div>

              {/* Tenure Plans */}
              <div className="mt-5 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Rental Plans</h3>

                <div className="relative">
                  {/* Dropdown Trigger */}
                  <div
                    className="w-full bg-white p-3 rounded-lg flex justify-between items-center cursor-pointer border border-gray-200 hover:border-blue-400 transition-all shadow-sm"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedPlan ? (
                      <span className="font-medium">
                        {selectedPlan.duration} Months - ₹
                        {selectedPlan.pricePerMonth}/month
                      </span>
                    ) : (
                      <span className="text-gray-400">Select a plan</span>
                    )}
                    <span
                      className={`text-gray-500 text-xs transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                      {product.tenurePlans?.map((plan) => (
                        <div
                          key={plan.duration}
                          className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors border-b last:border-b-0 ${
                            selectedPlan?.duration === plan.duration
                              ? "bg-blue-50 border-l-4 border-l-blue-500"
                              : "border-l-4 border-l-transparent"
                          }`}
                          onClick={() => {
                            setSelectedPlan(plan);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium ">
                              {plan.duration} Months
                            </span>
                            <span className="text-blue-600 font-bold">
                              ₹{plan.totalPrice}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            ₹{plan.pricePerMonth}/month
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Total Summary */}
              {selectedPlan && (
                <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                  <p className="font-medium">Summary</p>
                  <div className="flex flex-col text-gray-700 mt-2 gap-2">
                    <p className="flex justify-between">
                      Duration <span>{selectedPlan.duration} Months</span>
                    </p>
                    <p className="flex justify-between">
                      Security Deposit <span>₹{product.securityDeposit}</span>
                    </p>
                    <p className="flex justify-between">
                      Selected Plan<span>₹{selectedPlan.totalPrice}</span>
                    </p>

                    <hr />
                    <p className="flex text-lg justify-between ">
                      Total Amount
                      <span className="text-green-500 text-xl font-bold">
                        ₹{product.securityDeposit + selectedPlan.totalPrice}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Button */}
            <div className="flex flex-col gap-4 ">
              <button
                className="
              mt-8
              w-full
              bg-blue-500
              text-white
              py-3
              rounded-lg
              hover:bg-blue-600
              transition
              cursor-pointer
              "
              >
                Rent Now
              </button>
              <button
                onClick={isInCart ? undefined : handleAddToCart}
                disabled={isInCart}
                className={`flex items-center gap-3 justify-center w-full text-white px-4 py-2 rounded-lg transition ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
              >
                <FiShoppingCart size={20} />{" "}
                {isInCart ? "Already in Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Similar items */}
      <section className="px-15 py-10 bg-gray-50">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-6">Similar Items</h1>
            <Link
              to="/products"
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              View All
            </Link>
          </div>
          {similarProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
