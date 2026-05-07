import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();

  console.log("params Id : ", id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );

        setProduct(response.data.data);
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT IMAGE */}
        <div>
          <img
            src={"https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
            alt={product.name}
            className="w-full rounded-2xl shadow-md"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2 capitalize">{product.category}</p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Deposit */}
          <div className="mt-6">
            <h3 className="font-semibold">Security Deposit</h3>

            <p className="text-lg text-green-600">₹{product.securityDeposit}</p>
          </div>

          {/* Tenure Plans */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Rental Plans</h3>

            <div className="space-y-3">
              {product.tenurePlans?.map((plan) => (
                <div
                  key={plan.duration}
                  className="
                    border
                    rounded-xl
                    p-4
                    flex
                    justify-between
                    items-center
                  "
                >
                  <div>
                    <p className="font-medium">{plan.duration} Months</p>

                    <p className="text-sm text-gray-500">
                      ₹{plan.pricePerMonth}/month
                    </p>
                  </div>

                  <p className="font-bold text-blue-600">₹{plan.totalPrice}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            className="
              mt-8
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
