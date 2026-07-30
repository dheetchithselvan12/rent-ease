import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/product/ProductSkeleton";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    items: product,
    meta,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userMaxPrice, setUserMaxPrice] = useState(null);
  const [selectedTenures, setSelectedTenures] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const limit = 8;
  const searchQuery = searchParams.get("search")?.trim() || "";
  const page = Number(searchParams.get("page")) || 1;

  const updatePage = (nextPage) => {
    const params = new URLSearchParams(searchParams);

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    setSearchParams(params, { replace: true });
  };

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
    if (searchQuery) {
      params.search = searchQuery;
    }
    dispatch(fetchProducts(params));
  }, [
    dispatch,
    page,
    selectedCategories,
    selectedTenures,
    userMaxPrice,
    searchQuery,
  ]);

  const allCategories = meta?.allCategories || ["furniture", "appliance"];
  const highestPrice = meta?.highestPrice || 10000;
  const maxPrice = userMaxPrice !== null ? userMaxPrice : highestPrice;
  const totalItems = meta?.total || 0;
  const hasMore = meta?.pages ? page < meta.pages : false;
  const activeFilterCount =
    selectedCategories.length +
    selectedTenures.length +
    (searchQuery ? 1 : 0) +
    (userMaxPrice !== null && userMaxPrice < highestPrice ? 1 : 0);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
    updatePage(1);
  };

  const toggleTenure = (tenure) => {
    setSelectedTenures((prev) =>
      prev.includes(tenure)
        ? prev.filter((t) => t !== tenure)
        : [...prev, tenure],
    );
    updatePage(1);
  };

  const handlePriceChange = (e) => {
    setUserMaxPrice(Number(e.target.value));
    updatePage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setUserMaxPrice(null);
    setSelectedTenures([]);
    updatePage(1);
    navigate(
      searchQuery
        ? `/products?search=${encodeURIComponent(searchQuery)}`
        : "/products",
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-5 bg-gray-200 px-4 py-6 sm:px-6 lg:flex-row lg:px-10 xl:px-15">
      <div className="sticky top-0 z-30 lg:hidden">
        <button
          type="button"
          onClick={() => setIsFilterOpen((open) => !open)}
          aria-expanded={isFilterOpen}
          className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 font-medium text-gray-900 shadow-sm"
        >
          <span className="flex items-center gap-2">
            {isFilterOpen ? <FiX /> : <FiFilter />}
            {isFilterOpen ? "Close filters" : "Show filters"}
          </span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <section
        className={`${isFilterOpen ? "block" : "hidden"} sticky top-16 z-20 max-h-[calc(100vh-5rem)] w-full overflow-y-auto rounded-lg bg-gray-100 p-4 pb-5 text-gray-500 shadow-sm lg:top-5 lg:block lg:max-h-[calc(100vh-2.5rem)] lg:w-64 lg:shrink-0`}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-medium text-black">Filters</p>
            <p className="my-1 text-sm">{totalItems} items available</p>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-200 lg:hidden"
            aria-label="Close filters"
          >
            <FiX />
          </button>
        </div>
        <hr className="mb-3 mt-4 text-gray-300" />

        <div className="mb-3">
          <p className="text-sm font-medium">CATEGORIES</p>
          <div className="mt-2 flex flex-col gap-2">
            {allCategories.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-2 capitalize hover:text-blue-500"
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
            <hr className="mt-4 text-gray-300" />
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-2 text-sm font-medium">PRICE RANGE (/mo)</p>
          <input
            type="range"
            min="0"
            max={highestPrice}
            value={maxPrice}
            onChange={handlePriceChange}
            className="mt-2 w-full cursor-pointer accent-blue-500"
          />
          <div className="mt-1 flex justify-between text-xs">
            <span>Rs.0</span>
            <span>Rs.{maxPrice}</span>
          </div>
          <hr className="mt-4 text-gray-300" />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">RENTAL TENURE</p>
          <div className="flex flex-wrap gap-2">
            {[1, 3, 6, 12].map((months) => (
              <span
                key={months}
                onClick={() => toggleTenure(months)}
                className={`cursor-pointer rounded-full border px-2 py-1 text-sm transition-colors ${
                  selectedTenures.includes(months)
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-blue-400"
                }`}
              >
                {months} Months
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="h-fit w-full pb-5 lg:min-w-0 lg:flex-1">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <p className="font-medium text-gray-700">Active filters: </p>
          {searchQuery && (
            <span className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-2 py-1 text-xs shadow-sm">
              Search: {searchQuery}
              <button
                onClick={() => navigate("/products")}
                className="ml-1 cursor-pointer font-bold text-blue-500 hover:text-blue-600"
              >
                x
              </button>
            </span>
          )}
          {selectedCategories.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-2 py-1 text-xs capitalize shadow-sm"
            >
              {cat}{" "}
              <button
                onClick={() => toggleCategory(cat)}
                className="ml-1 cursor-pointer font-bold text-blue-500 hover:text-blue-600"
              >
                x
              </button>
            </span>
          ))}
          {userMaxPrice !== null && userMaxPrice < highestPrice && (
            <span className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-2 py-1 text-xs shadow-sm">
              Up to Rs.{maxPrice}{" "}
              <button
                onClick={() => {
                  setUserMaxPrice(null);
                  updatePage(1);
                }}
                className="ml-1 cursor-pointer font-bold text-blue-500 hover:text-blue-600"
              >
                x
              </button>
            </span>
          )}
          {selectedTenures.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-2 py-1 text-xs shadow-sm"
            >
              {t} Months{" "}
              <button
                onClick={() => toggleTenure(t)}
                className="ml-1 cursor-pointer font-bold text-blue-500 hover:text-blue-600"
              >
                x
              </button>
            </span>
          ))}
          {(selectedCategories.length > 0 ||
            (userMaxPrice !== null && userMaxPrice < highestPrice) ||
            selectedTenures.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="cursor-pointer text-sm text-blue-500 hover:text-blue-600 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {product.length > 0 ? (
            product.map((item) => <ProductCard key={item._id} product={item} />)
          ) : !loading ? (
            <div className="col-span-full flex min-h-80 items-center justify-center rounded-md bg-gray-100 px-4 py-10 text-center text-lg text-gray-500 sm:text-xl lg:min-h-130">
              {searchQuery
                ? `No products found for "${searchQuery}".`
                : "No products match your filters."}
            </div>
          ) : null}
          {loading &&
            [...Array(limit)].map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
          {error && (
            <div className="col-span-full py-10 text-center text-red-500">
              {error.message}
            </div>
          )}
        </div>
        {!loading && !error && hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => updatePage(page + 1)}
              className="mt-10 cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-center text-white transition-colors hover:bg-blue-600"
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
