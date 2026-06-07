import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { VscArchive } from "react-icons/vsc";

const UserDashboardNavbar = () => {
  return (
    <div className="sticky left-0 border border-gray-300 rounded-md w-fit h-full p-2">
      <h1 className="text-xl font-medium">My Account</h1>
      <p className="text-gray-500 text-sm tracking-tighter">
        manage your rentals and profile
      </p>

      <div className="my-10 space-y-4">
        <Link className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100/50 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 ">
          <MdOutlineDashboard size={20} /> Dashboard
        </Link>
        <Link className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 ">
          <CgNotes size={19} /> My Orders
        </Link>
        <Link className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2  ">
          <VscArchive size={20} /> Active Subscriptions
        </Link>
        <Link className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 ">
          <FiHeart size={20} /> Wishlist
        </Link>
        <Link className="flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 ">
          <CiSettings size={24} /> Settings
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;
