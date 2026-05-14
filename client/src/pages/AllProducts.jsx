import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const fetchedProducts = response.data.data;
        setProduct(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="flex gap-5 w-full h-screen px-15 py-10 bg-gray-200">
      {/* Filter Section */}
      <section className="w-[20%] h-fit  p-2 bg-gray-100 rounded-lg text-gray-500">
        <div>
          <p>filters</p>
          <p>items available</p>
        </div>

        <div>
          <p>CATEGORIES</p>
          <div>
            <li>sofa</li>
            <li>bed</li>
            <li>Ac</li>
          </div>
        </div>

        <div>
          <p>PRICE RANGE (/mo)</p>
        </div>

        <div>
          <p>RENTAL TENURE</p>
        </div>
      </section>

      {/* Product List */}
      <section className=" w-[80%] h-fit pb-5 ">
        <div className="mb-5">
          <p className="text-gray-700">Active filters : </p>
        </div>

        <div className="grid grid-cols-4 gap-4 ">
          {/* product Items */}
          {product?.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
        {/* <div className="flex justify-center sticky bottom-0">
          <button className=" my-5 px-3 py-2 bg-blue-500 rounded-md text-center text-white">
            Load More
          </button>
        </div> */}
      </section>
    </div>
  );
};

export default AllProducts;
