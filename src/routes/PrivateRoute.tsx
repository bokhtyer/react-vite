import type React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import path from "./path";
import { userData } from "../config/sessionKeys";

interface PrivateRouteProps {
    allowedRoles?: string[];
    routeCheck?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, routeCheck = false }) => {
    const isAuthenticated = localStorage.getItem("token"); // Replace with your auth logic
    const user = localStorage.getItem(userData); // Replace with your role logic
    const userRole = user
        ? (() => {
              try {
                  return JSON.parse(user)?.role;
              } catch {
                  return null;
              }
          })()
        : null;
    const location = useLocation();
    let allowedRoutes: string[] = [];

    /*
     * Parse the user data to get allowed routes.
     * This assumes that the user data contains a 'routes' field with an array of allowed paths.
     * Adjust this logic based on your actual user data structure.
     * dynamic base on route access page allowedRoutes = ["/agency"]
     * This is a simple example, you can modify it to fit your needs.
     * If the user data is not in JSON format or does not contain the 'routes'
     * field, it will default to an empty array.
     */
    try {
        const parsed = user ? JSON.parse(user) : {};
        allowedRoutes = parsed.routes || [];
    } catch {
        allowedRoutes = [];
    }

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to={path.login} state={{ from: location }} replace />;
    }

    // If role check is active
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to={path.unauthorized} replace />;
    }

    // If route check is active
    if (routeCheck && allowedRoutes.length > 0) {
        const currentPath = location.pathname;
        const isAllowed = allowedRoutes.includes(currentPath);

        if (!isAllowed) {
            return <Navigate to={path.unauthorized} replace />;
        }
    }

    // If authenticated and authorized, render the child routes
    return <Outlet />;
};

export default PrivateRoute;
