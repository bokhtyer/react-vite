// Header.jsx
import { useState } from "react";
import { FaMapMarkerAlt, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
import path from "../../../routes/path";
import siteConfig from "../../../config/site-config";
import Button from "../../common/button/Button";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            setActiveSubmenu(null);
        }
        document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
    };

    const toggleSubmenu = (index: any) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };
    const menuItems = [
        {
            title: "Home",
            submenu: [
                { title: "Home Default", link: "#" },
                { title: "Home Modern", link: "#" },
                { title: "Home Classic", link: "#" },
            ],
        },
        {
            title: "Shop",
            submenu: [
                { title: "Product List", link: "#" },
                { title: "Product Grid", link: "#" },
                { title: "Categories", link: "#" },
            ],
        },
        {
            title: "Pages",
            submenu: [
                { title: "About Us", link: "#" },
                { title: "Contact", link: "#" },
                { title: "FAQ", link: "#" },
            ],
        },
        {
            title: "Blog",
            submenu: [
                { title: "Blog Grid", link: "#" },
                { title: "Blog List", link: "#" },
                { title: "Blog Single", link: "#" },
            ],
        },
        { title: "Contact", link: "#" },
    ];
    return (
        <>
            <div className="top-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="top-bar-left">
                                <Link to="#" className="location-link">
                                    <FaMapMarkerAlt /> Dhaka - 1000, Bangladesh
                                </Link>
                                <span className="divider">|</span>
                                <a href="mailto:support@example.com" className="email-link">
                                    <MdEmail /> support@example.com
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="top-bar-right">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header className="main-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-6">
                            <div className="header-left">
                                <button className="mobile-menu-toggle d-lg-none" onClick={toggleMobileMenu}>
                                    <FaBars />
                                </button>
                                <div className="logo">
                                    <Link to={path.home}>
                                        <img src={siteConfig.logo} alt={siteConfig.company_name} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 d-none d-lg-block">
                            <nav className="main-nav">
                                <ul className="nav-list">
                                    <li className="nav-item has-submenu">
                                        <Link to="#">
                                            Home <FaChevronDown />
                                        </Link>
                                        <div className="submenu">
                                            <div className="submenu-inner">
                                                <div className="submenu-column">
                                                    <h4>Home Layouts</h4>
                                                    <ul>
                                                        <li>
                                                            <Link to="#">Home Default</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">Home Modern</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">Home Classic</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item has-submenu">
                                        <a href="#">
                                            Shop <FaChevronDown />
                                        </a>
                                        <div className="submenu">
                                            <div className="submenu-inner">
                                                <div className="submenu-column">
                                                    <h4>Shop Pages</h4>
                                                    <ul>
                                                        <li>
                                                            <Link to="#">Product List</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">Product Grid</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">Categories</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#">Pages</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#">Blog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#">Contact</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="col-lg-2 col-6">
                            <div className="header-actions">
                                <Button onClick={() => navigate(path.login)} btnText="Login" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
                    <div className="mobile-menu-header">
                        <button className="mobile-menu-close" onClick={toggleMobileMenu}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="mobile-menu-content">
                        <nav className="mobile-nav">
                            <ul>
                                {menuItems?.map((item: any, index: number) => (
                                    <li key={index} className={item.submenu ? "has-submenu" : ""}>
                                        <div className="menu-item-header">
                                            <Link to={item.link}>{item.title}</Link>
                                            {item.submenu && (
                                                <button
                                                    className={`submenu-toggle ${
                                                        activeSubmenu === index ? "active" : ""
                                                    }`}
                                                    onClick={() => toggleSubmenu(index)}
                                                >
                                                    <FaChevronDown />
                                                </button>
                                            )}
                                        </div>
                                        {item.submenu && (
                                            <ul className={`mobile-submenu ${activeSubmenu === index ? "active" : ""}`}>
                                                {item.submenu.map((subItem: any, subIndex: number) => (
                                                    <li key={subIndex}>
                                                        <Link to={subItem.link}>{subItem.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu} />}
        </>
    );
};

export default Header;
