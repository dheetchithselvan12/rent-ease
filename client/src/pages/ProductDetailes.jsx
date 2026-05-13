import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart, FiInfo } from "react-icons/fi";

const ProductDetails = () => {
  const { id } = useParams();

  console.log("params Id : ", id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );

        setProduct(response.data.data);
        if (response.data?.tenurePlans?.length > 0) {
          setSelectedPlan(response.data.data.tenurePlans[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 className="p-6">Loading...</h2>;
  }

  if (!product) {
    return <h2 className="p-6">Product not found</h2>;
  }

  return (
    <section className="px-15 py-10 bg-gray-100">
      <div className="flex justify-between  ">
        {/* LEFT IMAGE */}
        <div className="flex flex-col gap-8 w-[54%] bg-white px-8 py-8 rounded-xl">
          <img
            src={"https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
            alt={product.name}
            className=" rounded-2xl shadow-md"
          />
          <div className="flex gap-4 w-full cursor-pointer ">
            <img
              className="w-40 h-40 bg-gray-300 rounded-md"
              src={"https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
            />
            <img
              className="w-40 h-40 bg-gray-300 rounded-md"
              src={"https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
            />
            <img
              className="w-40 h-40 bg-gray-300 rounded-md"
              src={"https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
            />
            <img
              className="w-40 h-40 bg-gray-300 rounded-md"
              src={"https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="bg-white  rounded-xl px-8 py-6 w-[42%]  h-fit ">
          <div className="h-130 overflow-y-auto custom-scrollbar ">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-black mt-2 capitalize bg-blue-400/10 inline px-2 py-1 text-sm rounded-sm">
                {product.category}
              </p>
              <h1 className="text-4xl font-medium">{product.name}</h1>
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
            <button className="flex items-center gap-3 justify-center bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
              <FiShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
