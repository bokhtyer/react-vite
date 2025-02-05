import type React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import path from "./path";

interface PrivateRouteProps {
    allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
    const isAuthenticated = localStorage.getItem("token"); // Replace with your auth logic
    const userRole = localStorage.getItem("role"); // Replace with your role logic
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to={path.login} state={{ from: location }} replace />;
    }

    if (userRole && !allowedRoles.includes(userRole)) {
        // Redirect to unauthorized page if user doesn't have the required role
        return <Navigate to={path.unauthorized} replace />;
    }

    // If authenticated and authorized, render the child routes
    return <Outlet />;
};

export default PrivateRoute;
