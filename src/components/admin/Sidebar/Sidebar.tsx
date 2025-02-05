import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./Sidebar.scss";
import menuItems from "../../../routes/adminmenuItems";
import { MenuItem } from "../../../helper/type";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    isCollapsed: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
    const location = useLocation();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeItem, setActiveItem] = useState<string>("");

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = findActiveItem(menuItems, currentPath);
        if (currentItem) {
            setActiveItem(currentItem.id);
            if (currentItem.parent) {
                setExpandedItems([currentItem.parent]);
            } else {
                setExpandedItems([]);
            }
        }
    }, [location]);

    const findActiveItem = (items: MenuItem[], path: string): { id: string; parent?: string } | null => {
        for (const item of items) {
            if (item.path === path) {
                return { id: item.id };
            }
            if (item.children) {
                const childResult = findActiveItem(item.children, path);
                if (childResult) {
                    return { ...childResult, parent: item.id };
                }
            }
        }
        return null;
    };

    const toggleSubmenu = (itemId: string) => {
        setExpandedItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
    };

    const handleItemClick = (item: MenuItem) => {
        if (item.children) {
            toggleSubmenu(item.id);
        } else {
            setActiveItem(item.id);
            setExpandedItems([]);
        }
    };

    const renderMenuItem = (item: MenuItem) => (
        <li
            key={item.id}
            className={`nav-item ${expandedItems.includes(item.id) ? "expanded" : ""} ${
                activeItem === item.id ? "active" : ""
            }`}
        >
            <Link
                to={item.path || "#"}
                className="nav-link"
                onClick={(e) => {
                    if (item.children) {
                        e.preventDefault();
                    }
                    handleItemClick(item);
                }}
            >
                {item.icon && <span className="icon">{item.icon}</span>}
                <span className="title">{item.title}</span>
                {item.children && <FaChevronDown className="submenu-arrow" />}
            </Link>
            {item.children && (
                <ul className={`nav-children ${expandedItems.includes(item.id) ? "show" : ""}`}>
                    {item.children.map(renderMenuItem)}
                </ul>
            )}
        </li>
    );

    return (
        <aside className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <nav className="sidebar-nav">
                <ul className="nav-list">{menuItems.map(renderMenuItem)}</ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
