// Header.jsx
import { useState } from "react";
import { FaMapMarkerAlt, FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Header.scss";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

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
                                <a href="#" className="location-link">
                                    <FaMapMarkerAlt /> Store Locator
                                </a>
                                <span className="divider">|</span>
                                <a href="mailto:support@example.com" className="email-link">
                                    <MdEmail /> support@example.com
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="top-bar-right">
                                <span className="announcement">Open Door To A worlds Of Fashion | Discover Now</span>
                                <div className="language-currency">
                                    <select className="language-select">
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                    </select>
                                    <select className="currency-select">
                                        <option value="usd">USD</option>
                                        <option value="eur">EUR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header className="main-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-2 col-6">
                            <div className="header-left">
                                <button className="mobile-menu-toggle d-lg-none" onClick={toggleMobileMenu}>
                                    <FaBars />
                                </button>
                                <div className="logo">
                                    <a href="/">WEIBOO</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 d-none d-lg-block">
                            <nav className="main-nav">
                                <ul className="nav-list">
                                    <li className="nav-item has-submenu">
                                        <a href="#">Home</a>
                                        <div className="submenu">
                                            <div className="submenu-inner">
                                                <div className="submenu-column">
                                                    <h4>Home Layouts</h4>
                                                    <ul>
                                                        <li>
                                                            <a href="#">Home Default</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Home Modern</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Home Classic</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item has-submenu">
                                        <a href="#">Shop</a>
                                        <div className="submenu">
                                            <div className="submenu-inner">
                                                <div className="submenu-column">
                                                    <h4>Shop Pages</h4>
                                                    <ul>
                                                        <li>
                                                            <a href="#">Product List</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Product Grid</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Categories</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#">Pages</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#">Blog</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#">Contact</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="col-md-2 col-6">
                            <div className="header-actions">
                                <button className="action-btn search">
                                    <FaSearch />
                                </button>
                                <button className="action-btn account">
                                    <FaUser />
                                </button>
                                <button className="action-btn cart">
                                    <FaShoppingCart />
                                    <span className="cart-count">3</span>
                                </button>
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
                                            <a href={item.link}>{item.title}</a>
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
                                                        <a href={subItem.link}>{subItem.title}</a>
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
