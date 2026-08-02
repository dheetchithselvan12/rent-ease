import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../features/auth/authSlice";
import { MdOutlineDashboard } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { VscArchive } from "react-icons/vsc";
import { MdOutlineLogout } from "react-icons/md";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
} from "react-icons/fi";
import { UserAvatar } from "../common/UserAvatar";

const UserDashboardNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(true);

  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName = fullName || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email;

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    alert("You have been logged out.");
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
      "flex min-h-11 items-center rounded-lg border p-2 text-sm font-medium transition-colors duration-300 sm:min-h-0 sm:rounded-md sm:border-0",
      isExpanded
        ? "justify-start gap-2"
        : "justify-start gap-2 sm:justify-center sm:gap-0",
      isActive
        ? "border-blue-200 bg-blue-100 text-blue-600 shadow-sm sm:text-blue-500 sm:shadow-none"
        : "border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:hover:bg-blue-100 sm:hover:text-blue-500",
    ].join(" ");

  return (
    <aside
      className={`sticky top-16 z-30 h-fit w-full shrink-0 self-start rounded-xl border border-gray-300 bg-white p-3 shadow-sm transition-all duration-300 sm:top-20 sm:rounded-md sm:p-2 ${
        isExpanded ? "sm:w-64" : "sm:w-18"
      }`}
    >
      <div className="mb-3 rounded-lg bg-blue-50 p-3 sm:mb-0 sm:bg-transparent sm:p-0">
        <div className="flex items-center justify-between gap-3 sm:hidden">
          <div
            className="flex min-w-0 items-center gap-2"
            title={`${displayName}${userEmail ? ` - ${userEmail}` : ""}`}
          >
            <UserAvatar className="h-12 w-12 shrink-0 rounded-full" />
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-gray-800">
                {displayName}
              </h1>
              <p className="truncate text-xs text-gray-600">{userEmail}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-blue-100 bg-white text-blue-600 shadow-sm transition-colors hover:bg-blue-100  "
            aria-label={
              isMobileNavOpen ? "Hide account menu" : "Show account menu"
            }
            title={isMobileNavOpen ? "Hide menu" : "Show menu"}
          >
            {isMobileNavOpen ? (
              <FiChevronUp size={22} />
            ) : (
              <FiChevronDown size={22} />
            )}
          </button>
        </div>

        <div
          className={`my-2 hidden items-center gap-3 sm:flex ${
            isExpanded
              ? "justify-between sm:flex-row sm:items-start"
              : "justify-center sm:flex-col sm:items-center"
          }`}
        >
          <div
            className={`min-w-0 items-center gap-2 ${
              isExpanded ? "order-1" : "order-2"
            } ${isExpanded ? "flex" : "flex sm:flex-col"}`}
            title={`${displayName}${userEmail ? ` - ${userEmail}` : ""}`}
          >
            <UserAvatar className="h-12 w-12 shrink-0 rounded-full" />
            <div
              className={`min-w-0 ${isExpanded ? "block" : "block sm:hidden"}`}
            >
              <h1 className="truncate text-sm font-semibold text-gray-800">
                {displayName}
              </h1>
              <p className="truncate text-xs text-gray-600 sm:text-sm">
                {userEmail}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 ${
              isExpanded ? "order-2" : "order-1"
            }`}
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
      </div>

      <nav
        className={`grid grid-cols-2 gap-2 sm:mt-4 sm:flex sm:flex-col sm:items-stretch sm:gap-0 sm:space-y-3 sm:overflow-visible ${
          isMobileNavOpen ? "grid" : "hidden sm:flex"
        }`}
      >
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
              className={`min-w-0 truncate text-xs sm:text-sm ${
                isExpanded ? "inline" : "inline sm:hidden"
              }`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className={[
            "col-span-2 flex min-h-11 shrink-0 cursor-pointer items-center rounded-lg border border-red-100 bg-red-50 p-2 text-sm font-medium text-red-600 transition-colors duration-300 hover:bg-red-100 ",
            isExpanded
              ? "justify-center gap-2 sm:justify-start"
              : "justify-center gap-2 sm:gap-0",
          ].join(" ")}
          title="Logout"
        >
          <MdOutlineLogout size={21} />
          <span
            className={`min-w-0 truncate text-xs sm:text-sm ${
              isExpanded ? "inline" : "inline sm:hidden"
            }`}
          >
            Logout
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default UserDashboardNavbar;
