import type React from "react";
import { Navigate, Outlet } from "react-router-dom";
import path from "./path";
import siteConfig from "../config/site-config";

const LoginRoute: React.FC = () => {
    const isAuthenticated = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Replace with your auth logic
    let redirectPath = path.dashboard;
    if (role === siteConfig.role.admin) {
        redirectPath = path.dashboard;
    }
    if (role === siteConfig.role.user) {
        redirectPath = path.user.profile;
    }
    if (isAuthenticated) {
        // Redirect to dashboard if already authenticated
        return <Navigate to={redirectPath} replace />;
    }

    // If not authenticated, render the child routes
    return <Outlet />;
};

export default LoginRoute;
