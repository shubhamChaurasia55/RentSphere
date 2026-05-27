import { Navigate } from "react-router-dom";
import useAuthStore from "./authStore";

const PublicRoute = ({ children }) => {
  // Grab both the authentication status AND the user data
  const { isAuthenticated, user } = useAuthStore();

  /* USER ALREADY LOGGED IN */
  if (isAuthenticated) {
    
    // If the user is a landlord, send them straight to their dashboard
    if (user?.role === "landlord") {
      return <Navigate to="/landlord/dashboard" replace />;
    }
    
    // If the user is a tenant, send them to the home page
    return <Navigate to="/" replace />;
  }

  // If not logged in, allow them to see the login/register page
  return children;
};

export default PublicRoute;