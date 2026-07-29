import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice.js";
import { FiSearch, FiCalendar, FiTruck } from "react-icons/fi";
import ProductSkeleton from "../components/product/ProductSkeleton";

import MAINIMG from "../assets/homeImg.png";
import FURNITURE from "../assets/furniture.png";
import APPLIANCES from "../assets/appliances.jpg";
import ProductCard from "../components/product/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const { items, loading, error, meta } = useSelector(
    (state) => state.products,
  );

  const [page, setPage] = useState(1);
  const limit = 4;

  const categorys = [
    { imgage: FURNITURE, title: "Furnitures", link: "Explore Collection" },
    { imgage: APPLIANCES, title: "Appliances", link: "View appliances" },
  ];

  useEffect(() => {
    const params = {
      page,
      limit,
    };

    dispatch(fetchProducts(params));
  }, [dispatch, page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (meta?.pages && page < meta.pages) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 4 }));
  }, [dispatch]);

  if (error) return <h2>Error: {error}</h2>;

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
        <section className="mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-7xl flex-col-reverse items-center justify-center gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:px-8 xl:px-0">
          <div className="flex w-full flex-col gap-5 text-center lg:w-1/2 lg:text-left">
            <h1 className="mx-auto max-w-2xl text-4xl font-medium leading-tight sm:text-5xl lg:mx-0 lg:text-6xl">
              Rent Furniture & Appliances Easily
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 sm:text-lg lg:mx-0">
              Transform your space without the commitment. Access premium,
              modern furniture and state-of-the-art appliances with flexible
              monthly plans tailored to your lifestyle.
            </p>
            <div className="flex flex-col gap-3 text-white sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/products?category=furniture"
                className="rounded-md bg-blue-500 px-4 py-3 text-center transition-all hover:bg-blue-600"
              >
                Browse Furniture
              </Link>
              <Link
                to="/products?category=appliances"
                className="rounded-md bg-gray-500 px-4 py-3 text-center transition-all hover:bg-gray-600"
              >
                Explore Appliances
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] w-full max-w-xl rounded-xl bg-blue-500 sm:aspect-[16/9] lg:w-[46%]">
            <img
              src={MAINIMG}
              alt="main Image"
              className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-md object-cover shadow-xl sm:w-[95%] lg:-left-8 lg:top-10 lg:w-full lg:translate-x-0 lg:translate-y-0"
            />
          </div>
        </section>

        {/* Category  */}
        <section className="mx-auto my-12 w-full max-w-7xl px-4 sm:px-6 lg:my-20 lg:px-8 xl:px-0">
          <h2 className="text-xl font-bold">Available Category</h2>

          {/* Category Links */}
          <div className="my-5 grid gap-4 text-white md:grid-cols-2">
            {categorys.map((item, index) => (
              <Link
                key={index}
                to="/products"
                className="group relative overflow-hidden rounded-xl duration-500 hover:scale-[1.01]"
              >
                <div className="absolute bottom-6 left-6 z-10 sm:bottom-10 sm:left-10">
                  <p className="mb-2 text-2xl font-medium sm:text-3xl">
                    {item.title}
                  </p>
                  <p className="text-sm font-medium text-white/90">
                    {item.link}
                  </p>
                </div>
                <img
                  src={item.imgage}
                  alt={item.title}
                  className="h-64 w-full object-cover brightness-60 transition-all group-hover:brightness-40 sm:h-80 lg:h-85"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mx-auto my-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <Link
              to="/products"
              className="text-blue-500 hover:text-blue-600 text-sm font-medium cursor-pointer"
            >
              View All
            </Link>
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
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
        <section className="flex flex-col items-center bg-blue-300/10 px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-medium">How it Works</h2>
          <p className="mt-3 max-w-2xl text-gray-500 leading-7">
            Getting your desired furniture and appliances is just a few clicks
            away. Experience hassle-free renting.
          </p>
          <div className="relative mt-10 grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-10">
            {guide.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between"
              >
                <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-blue-200/60 sm:h-24 sm:w-24">
                  <item.icon size={30} />
                </div>
                <h5 className="text-xl font-medium mt-5 mb-2">{item.title}</h5>
                <p className="max-w-xs text-gray-500">{item.des}</p>
              </div>
            ))}
            <div className="absolute left-[16%] right-[16%] top-12 hidden h-0.5 bg-gray-300 md:block"></div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
