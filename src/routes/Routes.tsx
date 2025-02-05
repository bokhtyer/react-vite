import Login from "../pages/Login";
import Register from "../pages/Register";
import UserProfile from "../pages/profile/UserProfile";
import Dashboard from "../pages/dashboad/Dashboard";
import Home from "../pages/Home";
import AuthLayout from "../components/layouts/AuthLayout";
import MainLayout from "../components/layouts/MainLayout";
import path from "./path";
import AdminLayout from "../components/layouts/AdminLayout";
import AdminList from "../pages/dashboad/admin-list/AdminList";
import UnauthorizedPage from "../pages/errorpage/UnauthorizedPage";

type RouteProps = {
    path: string;
    element: JSX.Element;
    layout?: JSX.Element;
};

// Login routes
export const login_routes: RouteProps[] = [
    {
        path: path.login,
        element: <Login />,
        layout: <AuthLayout />,
    },
    {
        path: path.register,
        element: <Register />,
        layout: <AuthLayout />,
    },
];

// Admin routes
export const admin_routes: RouteProps[] = [
    {
        path: path.dashboard,
        element: <Dashboard />,
        layout: <AdminLayout />,
    },
    {
        path: path.admin.admin_list,
        element: <AdminList />,
        layout: <AdminLayout />,
    },
];

// User routes
export const user_routes: RouteProps[] = [
    {
        path: path.user.profile,
        element: <UserProfile />,
        layout: <MainLayout />,
    },
];

// Public routes
export const public_routes: RouteProps[] = [
    {
        path: path.home,
        element: <Home />,
        layout: <MainLayout />,
    },
    {
        path: path.unauthorized,
        element: <UnauthorizedPage />,
    },
];
