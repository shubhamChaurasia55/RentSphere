import { Navigate } from "react-router-dom";

import useAuthStore from "./authStore";

const PublicRoute = ({ children }) => {

  const { isAuthenticated } = useAuthStore();

  /* USER ALREADY LOGGED IN */
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;