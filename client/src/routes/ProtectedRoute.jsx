import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ requiredRole }) {
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);

  const isUserLoggedIn = token && isAuthenticated;

  if (!isUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/my-account" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
