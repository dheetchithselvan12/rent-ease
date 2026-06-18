import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/product/ProductSkeleton";

const AllProducts = () => {
  const dispatch = useDispatch();
  const {
    items: product,
    meta,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userMaxPrice, setUserMaxPrice] = useState(null);
  const [selectedTenures, setSelectedTenures] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const params = {
      page,
      limit,
      categories: selectedCategories.join(","),
      tenures: selectedTenures.join(","),
      append: page > 1,
    };
    if (userMaxPrice !== null) {
      params.maxPrice = userMaxPrice;
    }
    dispatch(fetchProducts(params));
  }, [dispatch, page, selectedCategories, selectedTenures, userMaxPrice]);

  const allCategories = meta?.allCategories || ["furniture", "appliance"];
  const highestPrice = meta?.highestPrice || 10000;
  const maxPrice = userMaxPrice !== null ? userMaxPrice : highestPrice;
  const totalItems = meta?.total || 0;
  const hasMore = meta?.pages ? page < meta.pages : false;

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
    setPage(1);
  };

  const toggleTenure = (tenure) => {
    setSelectedTenures((prev) =>
      prev.includes(tenure)
        ? prev.filter((t) => t !== tenure)
        : [...prev, tenure],
    );
    setPage(1);
  };

  const handlePriceChange = (e) => {
    setUserMaxPrice(Number(e.target.value));
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setUserMaxPrice(null);
    setSelectedTenures([]);
    setPage(1);
  };

  return (
    <div className="flex gap-5 w-full min-h-screen px-15 pt-10 bg-gray-200">
      {/* Filter Section */}
      <section className="w-[20%] h-fit p-2 pb-5 bg-gray-100 rounded-lg text-gray-500">
        <div className="mb-3">
          <p className="text-xl font-medium text-black">Filters</p>
          <p className="text-sm my-1">{totalItems} items available</p>
          <hr className="text-gray-300 mt-4" />
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 mt-2">
            {allCategories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer capitalize hover:text-blue-500"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="cursor-pointer accent-blue-500"
                />
                {cat}
              </label>
            ))}
            <hr className="text-gray-300 mt-4" />
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium mb-2">PRICE RANGE (/mo)</p>
          <input
            type="range"
            min="0"
            max={highestPrice}
            value={maxPrice}
            onChange={handlePriceChange}
            className="w-full  mt-2 cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>₹0</span>
            <span>₹{maxPrice}</span>
          </div>
          <hr className="text-gray-300 mt-4" />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">RENTAL TENURE</p>
          <div className="flex flex-wrap gap-2">
            {[1, 3, 6, 12].map((months) => (
              <span
                key={months}
                onClick={() => toggleTenure(months)}
                className={`cursor-pointer px-2 py-1 text-sm rounded-full border transition-colors ${
                  selectedTenures.includes(months)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {months} Months
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className=" w-[80%] h-fit pb-5 ">
        {/*Filters views*/}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <p className="text-gray-700 font-medium">Active filters: </p>
          {selectedCategories.map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 bg-white border border-gray-300 rounded-full text-xs capitalize flex items-center gap-1 shadow-sm"
            >
              {cat}{" "}
              <button
                onClick={() => toggleCategory(cat)}
                className="text-blue-500 font-bold ml-1 cursor-pointer hover:text-blue-600"
              >
                ×
              </button>
            </span>
          ))}
          {userMaxPrice !== null && userMaxPrice < highestPrice && (
            <span className="px-2 py-1 bg-white border border-gray-300 rounded-full text-xs flex items-center gap-1 shadow-sm">
              Up to ₹{maxPrice}{" "}
              <button
                onClick={() => {
                  setUserMaxPrice(null);
                  setPage(1);
                }}
                className="text-blue-500 font-bold ml-1 cursor-pointer hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
          {selectedTenures.map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-white border border-gray-300 rounded-full text-xs flex items-center gap-1 shadow-sm"
            >
              {t} Months{" "}
              <button
                onClick={() => toggleTenure(t)}
                className="text-blue-500 font-bold ml-1 cursor-pointer hover:text-blue-600"
              >
                ×
              </button>
            </span>
          ))}
          {(selectedCategories.length > 0 ||
            (userMaxPrice !== null && userMaxPrice < highestPrice) ||
            selectedTenures.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 ">
          {/* product Items */}
          {product.length > 0 ? (
            product.map((item) => <ProductCard key={item._id} product={item} />)
          ) : !loading ? (
            <div className="col-span-4 text-xl flex justify-center items-center bg-gray-100 rounded-md h-130 text-gray-500 py-10">
              No products match your filters.
            </div>
          ) : null}
          {loading &&
            [...Array(limit)].map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
          {error && (
            <div className="col-span-4 text-center text-red-500 py-10">
              {error}
            </div>
          )}
        </div>
        {!loading && !error && hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className=" mt-10 px-3 py-2 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer rounded-md text-center text-white"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllProducts;
