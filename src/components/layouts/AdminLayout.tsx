import { useState } from "react";
import Header from "../admin/header/Header";
import Sidebar from "../admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./css/AdminLayout.scss";

const AdminLayout = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`admin-layout ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
            <Header onToggleSidebar={toggleSidebar} />
            <div className="d-flex">
                <Sidebar isCollapsed={isSidebarCollapsed} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
