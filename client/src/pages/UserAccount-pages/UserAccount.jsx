import { Outlet } from "react-router-dom";
import UserDashboardNavbar from "../../components/navbar/UserDashboardNavbar";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { useSelector } from "react-redux";

const UserAccount = () => {
  const role = useSelector((state) => state.auth?.user?.role);
  return (
    <div className="flex min-h-screen flex-col gap-3 bg-blue-50 px-2 py-4 sm:flex-row sm:gap-5 sm:px-5 lg:py-8">
      {role === "admin" ? <AdminNavbar /> : <UserDashboardNavbar />}

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default UserAccount;
