import { Outlet } from "react-router-dom";
import UserDashboardNavbar from "../../components/navbar/UserDashboardNavbar";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { useSelector } from "react-redux";

const UserAccount = () => {
  const role = useSelector((state) => state.auth?.user?.role);
  return (
    <div className="flex gap-5 py-8 px-5 bg-blue-50">
      {role === "admin" ? <AdminNavbar /> : <UserDashboardNavbar />}

      <div className="w-fit flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default UserAccount;
