import type React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginRoute from "./LoginRoute";

import { login_routes, admin_routes, user_routes, public_routes } from "./Routes";
import NotFoundPage from "../pages/errorpage/NotFoundPage";

type RouteProps = {
    path: string;
    element: JSX.Element;
    layout?: JSX.Element;
};

const MainRoutes: React.FC = () => {
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
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                {/* Private routes */}
                {admin_routes.map((route: RouteProps, index: number) => (
                    <Route key={index} element={route.layout}>
                        <Route key={index} {...route} />
                    </Route>
                ))}
            </Route>

            {/* User-only Route */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
                {/* User routes */}
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

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default MainRoutes;
