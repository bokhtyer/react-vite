import type React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import path from "./path";
import { usePermissionCheck } from "../utils/permissionCheck";
import { useAuth } from "../utils/useAuth";
import siteConfig from "../config/site-config";

interface PrivateRouteProps {
    allowedRoles: string[];
    requiredPermission?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, requiredPermission }) => {
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const hasPermission = usePermissionCheck();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to={path.login} state={{ from: location }} replace />;
    }

    // if (userRole && !allowedRoles.includes(userRole)) {
    //     // Redirect to unauthorized page if user doesn't have the required role
    //     return <Navigate to={path.unauthorized} replace />;
    // }

    if (!allowedRoles.includes(user?.role || siteConfig.role.admin) || !hasPermission(requiredPermission)) {
        return <Navigate to={path.unauthorized} replace />;
    }

    // If authenticated and authorized, render the child routes
    return <Outlet />;
};

export default PrivateRoute;
