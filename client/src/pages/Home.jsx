import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice.js";
import { FiSearch, FiCalendar, FiTruck } from "react-icons/fi";
import ProductSkeleton from "../components/ProductSkeleton";

import MAINIMG from "../assets/homeImg.png";
import FURNITURE from "../assets/furniture.png";
import APPLIANCES from "../assets/appliances.jpg";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
  const dispatch = useDispatch();

  const { items, loading, error, meta } = useSelector(
    (state) => state.products,
  );
  console.log("Product Items : ", items);

  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 4;

  const categorys = [
    { imgage: FURNITURE, title: "Furnitures", link: "Explore Collection ➜" },
    { imgage: APPLIANCES, title: "Appliances", link: "View appliances ➜" },
  ];

  useEffect(() => {
    const params = {
      page,
      limit,
    };

    if (category !== "all") {
      params.category = category;
    }

    dispatch(fetchProducts(params));
  }, [dispatch, category, page]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (meta?.pages && page < meta.pages) {
      setPage((prev) => prev + 1);
    }
  };

  if (error) return <h2 className="text-center mt-10">Error: {error}</h2>;

  const guide = [
    {
      icon: FiSearch,
      title: "1.Browse",
      des: "Explore our extensive catalog of premium products.",
    },
    {
      icon: FiCalendar,
      title: "2.Choose Tenure",
      des: "Select a flexible rental plan from 3 to 24 months.",
    },
    {
      icon: FiTruck,
      title: "3.Get it Delivered",
      des: "Enjoy free delivery and installation within 48 hours.",
    },
  ];

  return (
    <>
      <main className="bg-gray-200">
        {/* Hero */}
        <section className="px-15 flex justify-between items-center h-dvh">
          <div className="flex flex-col gap-5 w-1/2">
            <h1 className="text-6xl font-medium w-[70%]">
              Rent Furniture & Appliances Easily
            </h1>
            <p className="w-[80%] text-lg text-gray-600">
              Transform your space without the commitment. Access premium,
              modern furniture and state-of-the-art appliances with flexible
              monthly plans tailored to your lifestyle.
            </p>
            <div className="flex gap-5 text-white">
              <a className="bg-blue-500 hover:bg-blue-600 transition-all px-4 py-2 rounded-md cursor-pointer">
                Browse Furniture
              </a>
              <a className="bg-gray-500 hover:bg-gray-600 transition-all px-4 py-2 rounded-md cursor-pointer">
                Explore Appliances
              </a>
            </div>
          </div>
          <div className="w-150 h-84  bg-blue-500 rounded-xl relative">
            <img
              src={MAINIMG}
              alt="main Image"
              className="absolute -left-10 top-10 w-150 rounded-md"
            />
          </div>
        </section>

        {/* Category  */}
        <section className="px-15 my-20 ">
          <h2 className="text-xl font-bold">Shop by Category</h2>

          {/* Category Links */}
          <div className="flex justify-between gap-4 my-5 p-2 text-white">
            {categorys.map((item, index) => (
              <div
                key={index}
                className="w-1/2 relative hover:scale-102  duration-500"
              >
                <div className="absolute z-1 left-10 bottom-10">
                  <p className="text-3xl mb-2 font-medium">{item.title}</p>
                  <a className="text-sm text-gray-200 underline cursor-pointer hover:text-blue-300 transition-all">
                    {item.link}
                  </a>
                </div>
                <img
                  src={item.imgage}
                  alt="Furniture"
                  className="w-full h-85 rounded-xl brightness-60 hover:brightness-40 transition-all"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="px-15 my-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>

            {/* Category Filter */}
            <div className="relative w-30">
              <select
                value={category}
                onChange={handleCategoryChange}
                className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700  cursor-pointer focus:outline-none "
              >
                <option value="all">All</option>
                <option value="furniture">Furniture</option>
                <option value="appliance">Appliances</option>
              </select>
              <div className="absolute text-gray-500 inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          {/* product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? [...Array(limit)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              : items.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>

          {/* page change */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold">
              Page {page} {meta?.pages ? `of ${meta.pages}` : ""}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={meta?.pages ? page >= meta.pages : false}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>

        {/* Guidence */}
        <section className="flex flex-col items-center bg-blue-300/10 py-20">
          <h2 className="text-2xl font-medium">How it Works</h2>
          <p className="text-gray-500 leading-9">
            Getting your desired furniture and appliances is just a few clicks
            away. Experience hassle-free renting.
          </p>
          <div className="flex mt-10 gap-15 relative">
            {guide.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between "
              >
                <div className="z-10 bg-white w-25 h-25 rounded-full flex justify-center items-center shadow-olive-200 shadow-lg">
                  <item.icon size={30} />
                </div>
                <h5 className="text-xl font-medium mt-5 mb-2">{item.title}</h5>
                <p className="text-gray-500">{item.des}</p>
              </div>
            ))}
            <div className="absolute left-50 top-13  w-200 h-0.5 bg-gray-300"></div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
