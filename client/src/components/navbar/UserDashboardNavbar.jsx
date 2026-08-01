import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../features/auth/authSlice";
import { MdOutlineDashboard } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { VscArchive } from "react-icons/vsc";
import { MdOutlineLogout } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { UserAvatar } from "../common/UserAvatar";

const UserDashboardNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(true);

  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName = fullName || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email;

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    {
      to: "/my-account",
      label: "Dashboard",
      icon: <MdOutlineDashboard size={20} />,
      end: true,
    },
    {
      to: "/my-account/orders",
      label: "My Orders",
      icon: <CgNotes size={19} />,
    },
    {
      to: "/my-account/subscriptions",
      label: "Active Subscriptions",
      icon: <VscArchive size={20} />,
    },
    {
      to: "/my-account/settings",
      label: "Settings",
      icon: <CiSettings size={24} />,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    [
      "flex items-center rounded-md p-2 text-sm transition-colors duration-300",
      isExpanded ? "justify-start gap-2" : "justify-center gap-0",
      isActive
        ? "bg-blue-100 text-blue-500"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-500",
    ].join(" ");

  return (
    <aside
      className={`sticky left-0 top-20 z-30 h-fit shrink-0 self-start rounded-md border border-gray-300 bg-white p-2 shadow-sm transition-all duration-300 ${
        isExpanded ? "w-50 sm:w-64" : "w-18"
      }`}
    >
      <div
        className={`flex flex-col items-center my-2${
          isExpanded ? " items-end" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex  h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
          aria-label={
            isExpanded ? "Collapse dashboard menu" : "Expand dashboard menu"
          }
          title={isExpanded ? "Collapse menu" : "Expand menu"}
        >
          {isExpanded ? (
            <FiChevronLeft size={22} />
          ) : (
            <FiChevronRight size={22} />
          )}
        </button>
      </div>
      <div
        className={`min-w-0 items-center gap-2 ${
          isExpanded ? "flex" : "flex flex-col"
        }`}
        title={`${displayName}${userEmail ? ` - ${userEmail}` : ""}`}
      >
        <UserAvatar className="h-12 w-12 shrink-0 rounded-full" />
        <div className={`min-w-0 ${isExpanded ? "block" : "hidden"}`}>
          <h1 className="truncate text-sm font-medium">{displayName}</h1>
          <p className="truncate text-sm text-gray-700">{userEmail}</p>
        </div>
      </div>

      <nav className="mt-4 flex flex-col space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navLinkClass}
            title={item.label}
          >
            <span className="shrink-0">{item.icon}</span>
            <span
              className={`min-w-0 truncate ${isExpanded ? "inline" : "hidden"}`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className={[
            "flex cursor-pointer items-center rounded-md p-2 text-sm text-gray-700 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-500",
            isExpanded ? "justify-start gap-2" : "justify-center gap-0",
          ].join(" ")}
          title="Logout"
        >
          <MdOutlineLogout size={21} />
          <span
            className={`min-w-0 truncate ${isExpanded ? "inline" : "hidden"}`}
          >
            Logout
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default UserDashboardNavbar;
