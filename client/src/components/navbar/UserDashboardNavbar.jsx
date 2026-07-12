import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { MdOutlineDashboard } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { VscArchive } from "react-icons/vsc";
import { MdOutlineLogout } from "react-icons/md";

const UserDashboardNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName = fullName || user?.email?.split("@")[0] || "User";
  const userAvatar = user?.avatar?.trim();
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff&rounded=true&size=128`;
  const avatarSrc = userAvatar || fallbackAvatar;
  const userEmail = user?.email;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="sticky left-0 top-20 border border-gray-300 rounded-md w-fit h-full p-2">
      <div className="flex gap-2 my-2 items-center">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-12 h-12 rounded-full "
        />
        <div>
          <h1 className="text-sm font-medium">{displayName}</h1>
          <p className="text-gray-700 text-sm ">{userEmail}</p>
        </div>
      </div>

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
          to="/my-account/settings"
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 items-center text-blue-500 bg-blue-100 rounded-md p-2 "
              : "flex gap-2 items-center hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-500 rounded-md p-2 "
          }
        >
          <CiSettings size={24} /> Settings
        </NavLink>
        <p
          onClick={handleLogout}
          className="flex gap-2 items-center p-2 hover:border-gray-100 hover:bg-blue-100 hover:text-blue-500 rounded-md duration-500 cursor-pointer "
        >
          <MdOutlineLogout size={21} />
          Logout
        </p>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;
