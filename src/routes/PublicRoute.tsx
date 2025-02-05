import type React from "react";
import { Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
    // If not authenticated, render the child routes
    return <Outlet />;
};

export default PublicRoute;
