import { Outlet } from "react-router-dom";
import UserDashboardNavbar from "../components/navbar/UserDashboardNavbar";

const UserAccount = () => {
  return (
    <div className="flex gap-5 py-8 px-5 bg-blue-50">
      <UserDashboardNavbar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserAccount;
