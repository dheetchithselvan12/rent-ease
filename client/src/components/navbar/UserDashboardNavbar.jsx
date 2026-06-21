import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { VscArchive } from "react-icons/vsc";
import { MdOutlineLogout } from "react-icons/md";

const UserDashboardNavbar = () => {
  return (
    <div className="sticky left-0 border border-gray-300 rounded-md w-1/5 h-full p-2">
      <h1 className="text-xl font-medium">My Account</h1>
      <p className="text-gray-500 text-sm tracking-tighter">
        manage your rentals and profile
      </p>

      <div className=" my-10 space-y-4">
        <NavLink
          to="/my-account"
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
        >
          <MdOutlineDashboard to="/my-account" size={20} /> Dashboard
        </NavLink>
        <NavLink
          to="/my-account/orders"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center text-blue-500 bg-blue-100 rounded-md p-2 "
              : "flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
          }
        >
          <CgNotes size={19} /> My Orders
        </NavLink>
        <NavLink
          to="/my-account/subscriptions"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center text-blue-500 bg-blue-100 rounded-md p-2 "
              : "flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
          }
        >
          <VscArchive size={20} /> Active Subscriptions
        </NavLink>
        <NavLink
          to="/my-account/wishlist"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center text-blue-500 bg-blue-100 rounded-md p-2 "
              : "flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
          }
        >
          <FiHeart size={20} /> Wishlist
        </NavLink>
        <NavLink
          to="/my-account/settings"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center text-blue-500 bg-blue-100 rounded-md p-2 "
              : "flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
          }
        >
          <CiSettings size={24} /> Settings
        </NavLink>
        <p className="flex gap-2 items-center p-2 hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 rounded-md duration-500 cursor-pointer ">
          <MdOutlineLogout size={21} />
          Logout
        </p>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;
