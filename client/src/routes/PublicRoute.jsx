import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute() {
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  // If user is already logged in, redirect to home
  // Otherwise, show the public page (login/register)
  return token && isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
