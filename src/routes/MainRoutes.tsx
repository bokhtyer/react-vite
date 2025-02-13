import type React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginRoute from "./LoginRoute";

import { login_routes, admin_routes, user_routes, public_routes } from "./Routes";
import NotFoundPage from "../pages/errorpage/NotFoundPage";
import siteConfig from "../config/site-config";
import { useAuth } from "../utils/useAuth";
import path from "./path";

type RouteProps = {
    path: string;
    element: JSX.Element;
    layout?: JSX.Element;
    permission?: string;
};

const MainRoutes: React.FC = () => {
    const { user } = useAuth();
    return (
        <Routes>
            {/* Public Routes (Unauthenticated) */}
            <Route element={<LoginRoute />}>
                {/* Public routes */}
                {login_routes.map((route: RouteProps, index: number) => (
                    <Route key={index} element={route.layout}>
                        <Route {...route} />
                    </Route>
                ))}
            </Route>

            {/* Private Routes (Authenticated) */}
            <Route element={<PrivateRoute allowedRoles={[siteConfig.role.admin]} />}>
                {admin_routes.map((route: RouteProps, index: number) => (
                    <Route key={index} element={route.layout}>
                        {!route?.permission || user?.permissions?.includes(route.permission) ? (
                            <Route key={index} {...route} />
                        ) : (
                            <Route key={index} element={<Navigate to={path.unauthorized} replace />} />
                        )}
                    </Route>
                ))}
            </Route>

            {/* User-only Route */}
            <Route element={<PrivateRoute allowedRoles={[siteConfig.role.user]} />}>
                {user_routes.map((route: RouteProps, index: number) => (
                    <Route key={index} element={route.layout}>
                        <Route key={index} {...route} />
                    </Route>
                ))}
            </Route>
            {/* Public route like home page about page contact page  */}
            <Route element={<PublicRoute />}>
                {/* Public routes */}
                {public_routes.map((route: RouteProps, index: number) => (
                    <Route key={index} element={route.layout}>
                        <Route key={index} {...route} />
                    </Route>
                ))}
            </Route>
            {/* <Route path={path.unauthorized} element={<Unauthorized />} /> */}
            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default MainRoutes;
