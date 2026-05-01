import { FiSearch, FiCalendar, FiTruck } from "react-icons/fi";

import MAINIMG from "../assets/homeImg.png";
import FURNITURE from "../assets/furniture.png";
import APPLIANCES from "../assets/appliances.jpg";

const Home = () => {
  const category = [
    { imgage: FURNITURE, title: "Furnitures", link: "Explore Collection ➜" },
    { imgage: APPLIANCES, title: "Appliances", link: "View appliances ➜" },
  ];
  const products = [
    {
      imgage: FURNITURE,
      title: "Noridc Fabric Sofa",
      description: "Minimalist 3-seater",
      tag: "Living Room",
      amount: "$29",
      tuen: "/mo",
      tuner: "12 mo tuner",
    },
    {
      imgage: APPLIANCES,
      title: "Smart Inverter Fridge",
      description: "320L Frost Free",
      tag: "Appliance",
      amount: "$35",
      tuen: "/mo",
      tuner: "6 mo tuner",
    },
    {
      imgage: MAINIMG,
      title: "Queen Storage Bed",
      description: "With Orthopedic Mattress",
      tag: "Bedroom",
      amount: "$42",
      tuen: "/mo",
      tuner: "12 mo tuner",
    },
  ];

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
            {category.map((item, index) => (
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

        {/* Featured Products */}
        <section className="px-15 my-10">
          {/* Titel */}
          <div className="flex justify-between my-5 items-center">
            <h2 className="text-2xl font-medium">Featured Products</h2>
            <a className="text-blue-600 cursor-pointer">View All</a>
          </div>
          {/* product cards */}
          <div className="flex mb-30 gap-5 pb-20">
            {products.map((item, index) => (
              <div
                key={index}
                className="bg-white w-1/3 rounded-xl border border-black/20 relative cursor-pointer"
              >
                <img
                  src={item.imgage}
                  alt="Image"
                  className="w-full h-55 rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="flex justify-between mt-10">
                    <p className="text-xl font-bold">
                      {item.amount}
                      <span className="text-sm text-gray-500 mx-1">
                        {item.tuen}
                      </span>
                    </p>
                    <div className="px-2 py-1 rounded-sm bg-blue-500/10">
                      <p className="text-xs font-medium">{item.tuner}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full items-center">
                      <p className="text-xs text-blue-700 font-bold">
                        {item.tag}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
