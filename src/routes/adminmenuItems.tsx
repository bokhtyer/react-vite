import { FaTachometerAlt, FaUsers, FaUserCog } from "react-icons/fa";
import { MenuItem } from "../helper/type";
import path from "./path";

const menuItems: MenuItem[] = [
    {
        id: path.dashboard,
        title: "Dashboard",
        path: path.dashboard,
        icon: <FaTachometerAlt />,
    },
    {
        id: "admin_management",
        title: "Admin Management",
        icon: <FaUsers />,
        children: [
            {
                id: path.admin.admin_list,
                title: "Admin List",
                path: path.admin.admin_list,
                icon: <FaUserCog />,
            },
        ],
    },
];
export default menuItems;
