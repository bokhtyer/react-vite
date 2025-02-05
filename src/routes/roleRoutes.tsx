import UserProfile from "../pages/profile/UserProfile";
import Dashboard from "../pages/dashboad/Dashboard";
import path from "./path";
import siteConfig from "../config/site-config";

interface RouteProps {
    path: string;
    element: JSX.Element;
    allowedRoles: string[];
}

export const roleRoutes = (userRole: string): RouteProps[] => {
    const routes: RouteProps[] = [
        {
            path: path.dashboard,
            element: <Dashboard />,
            allowedRoles: [siteConfig.role.admin],
        },
        {
            path: path.user.profile,
            element: <UserProfile />,
            allowedRoles: [siteConfig.role.user],
        },
    ];

    return routes.filter((route) => route.allowedRoles.includes(userRole));
};
