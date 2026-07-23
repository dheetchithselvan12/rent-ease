import { NavLink } from "react-router-dom";
import { UserAvatar } from "../common/UserAvatar";

import {
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineShoppingCart,
  MdLogout,
} from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const AdminNavbar = () => {
  const auth = useSelector((state) => state.auth);
  console.log("auth : ", auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="sticky left-0 top-20 border  border-gray-300 rounded-md w-fit h-full p-2">
      <div className="flex gap-2 my-2 items-center">
        <UserAvatar className="w-12 h-12 rounded-full " />
        <div>
          <h1 className="text-sm font-medium">{auth?.user?.firstName}</h1>
          <p className="text-gray-700 text-sm ">{auth?.user?.email}</p>
        </div>
      </div>
      <div className=" my-10 space-y-4">
        <NavLink
          to="/my-account"
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
        >
          <MdOutlineDashboard />
          Dashboard
        </NavLink>
        <NavLink
          to="/my-account/products"
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
        >
          <RiFileListLine />
          Products
        </NavLink>
        <NavLink
          to="/my-account/orders"
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
        >
          <MdOutlineShoppingCart />
          Orders
        </NavLink>
        <NavLink
          to="/my-account/rentals"
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
        >
          <MdOutlineInventory2 />
          Rentals
        </NavLink>
        <NavLink
          to="/my-account/customers"
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
        >
          <HiOutlineUsers />
          Customers
        </NavLink>
        <NavLink
          to="/my-account/settings"
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
        >
          <IoSettingsOutline />
          Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 w-full "
        >
          <MdLogout /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
