import { Navigate } from "react-router-dom";

import useAuthStore from "./authStore";

const ProtectedRoute = ({children, allowedRoles}) => {

    const {isAuthenticated, loading, user} = useAuthStore();

    if (loading) return <div>Loading...</div>

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    if(allowedRoles && !allowedRoles.includes(user?.role)){
        return <Navigate to="/" replace />;
    }

    return children;

};

export default ProtectedRoute;