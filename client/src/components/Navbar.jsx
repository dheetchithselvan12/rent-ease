import { useState } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiXCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const NAVLINKS = [
    { name: "Products" },
    { name: "Carts" },
    { name: "Dashboard" },
  ];

  const { cartItem } = useSelector((state) => state.cart);
  const totalCart = cartItem.length;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRemove = () => {
    setSearch("");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-lg px-15 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex gap-1 hover:scale-105 duration-500 cursor-pointer"
        >
          <span className="bg-blue-500 text-lg text-white px-3  font-bold rounded-sm ">
            R
          </span>
          <p className="text-2xl font-semibold text-blue-500">RentEase</p>
        </Link>

        {/* Nav links */}
        <div className="flex text-lg font-medium gap-7 cursor-pointer ">
          {NAVLINKS.map((item, index) => (
            <a
              key={index}
              className="relative group hover:text-blue-500 transition duration-300 text-gray-800"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500"></span>
            </a>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center  gap-4 bg-white/10 shadow-md py-1 px-2 w-80  rounded-lg relative">
          <FiSearch color="blue" />
          <input
            type="text"
            name="Search"
            value={search}
            placeholder="Search"
            className="outline-none "
            onChange={handleChange}
          />

          {/* Search Input remove logic */}
          {search && (
            <FiXCircle
              color="blue"
              className="cursor-pointer absolute top-0 right-0"
              onClick={handleRemove}
            />
          )}
        </div>

        {/* Nav Icons */}
        <div className="flex gap-4 bg-gray-600/10 px-3 py-2 rounded-md ">
          <Link to="/cart" className="relative z-10">
            <FiShoppingCart
              size={"20px"}
              color="blue"
              className="cursor-pointer hover:scale-125 duration-300 "
            />
            {totalCart > 0 && (
              <span className="absolute -z-10 -top-3 -right-2 w-2 h-2 flex justify-center items-center bg-red-400 p-2 rounded-full text-xs text-white">
                {totalCart}
              </span>
            )}
          </Link>
          <FiUser
            size={"20px"}
            color="blue"
            className="cursor-pointer hover:scale-125 duration-300 "
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
