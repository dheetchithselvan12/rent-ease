import { useState } from "react";
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiXCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const NAVLINKS = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "My Orders ", path: "/my-account/orders" },
  ];

  const { cartItem } = useSelector((state) => state.cart);
  const avatar = useSelector((state) => state.auth?.user?.avatar);
  const totalCart = cartItem.length;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (event) => {
    if (event.type === "keydown" && event.key !== "Enter") return;

    const trimmed = search.trim();
    const targetPath = trimmed
      ? `/products?search=${encodeURIComponent(trimmed)}`
      : "/products";

    navigate(targetPath);
    setIsMenuOpen(false);
  };

  const handleRemove = () => {
    setSearch("");
    navigate("/products");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:px-0">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 gap-1 duration-500 hover:scale-105"
            onClick={closeMenu}
          >
            <span className="rounded-sm bg-blue-500 px-3 text-lg font-bold text-white">
              R
            </span>
            <p className="text-2xl font-semibold text-blue-500">RentEase</p>
          </Link>

          {/* Nav links */}
          <div className="hidden cursor-pointer gap-7 text-lg font-medium lg:flex">
            {NAVLINKS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="group relative text-gray-800 transition duration-300 hover:text-blue-500"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="relative hidden w-full max-w-xs items-center gap-4 rounded-lg bg-white/10 px-2 py-1 shadow-md md:flex">
            <button type="button" onClick={handleSearch} className="cursor-pointer">
              <FiSearch color="blue" />
            </button>
            <input
              type="text"
              name="Search"
              value={search}
              placeholder="Search"
              className="w-full outline-none"
              onChange={handleChange}
              onKeyDown={handleSearch}
            />

            {/* Search Input remove logic */}
            {search && (
              <FiXCircle
                color="blue"
                className="absolute right-1 top-1 cursor-pointer"
                onClick={handleRemove}
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Nav Icons */}
            <div className="flex gap-4 rounded-md bg-gray-600/10 px-3 py-2">
              <Link to="/cart" className="relative z-10" onClick={closeMenu}>
                <FiShoppingCart
                  size={"20px"}
                  color="blue"
                  className="cursor-pointer duration-300 hover:scale-125"
                />
                {totalCart > 0 && (
                  <span className="absolute -right-2 -top-3 -z-10 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-xs text-white">
                    {totalCart}
                  </span>
                )}
              </Link>
              <Link to="/my-account" onClick={closeMenu}>
                {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    className="h-6 w-6 rounded-full duration-300 hover:scale-125"
                  />
                ) : (
                  <FiUser
                    size={"20px"}
                    color="blue"
                    className="cursor-pointer duration-300 hover:scale-125"
                  />
                )}
              </Link>
            </div>

            <button
              type="button"
              className="rounded-md bg-gray-600/10 p-2 text-blue-600 lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-gray-100 px-4 pb-4 md:px-6 lg:hidden">
            <div className="relative my-4 flex items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-md md:hidden">
              <button type="button" onClick={handleSearch}>
                <FiSearch color="blue" />
              </button>
              <input
                type="text"
                name="Search"
                value={search}
                placeholder="Search"
                className="w-full outline-none"
                onChange={handleChange}
                onKeyDown={handleSearch}
              />
              {search && (
                <FiXCircle
                  color="blue"
                  className="cursor-pointer"
                  onClick={handleRemove}
                />
              )}
            </div>
            <div className="flex flex-col gap-3 text-base font-medium">
              {NAVLINKS.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="rounded-md px-2 py-2 text-gray-800 transition hover:bg-blue-50 hover:text-blue-500"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
