import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  // Check if user has valid token and is authenticated
  const isUserLoggedIn = token && isAuthenticated;

  // If user is logged in, show the protected page
  // Otherwise, redirect to login page
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
