import type React from "react";
import { useState } from "react";
import { FaBars, FaCog, FaSignOutAlt, FaUser, FaChevronDown } from "react-icons/fa";
import "./Header.scss";
import { Link } from "react-router-dom";
import path from "../../../routes/path";

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <header className="admin-header">
            <div className="container-fluid px-3">
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto d-flex align-items-center">
                        <div className="logo ms-2">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8QBdz0nBHXAoc5ua8dESzaPxRplUOW.png"
                                alt="Logo"
                                height="32"
                            />
                        </div>
                        <button className="btn btn-link sidebar-toggle p-2" onClick={onToggleSidebar}>
                            <FaBars size={20} />
                        </button>
                    </div>

                    <div className="col-auto">
                        <div className="header-actions">
                            <div className="user-profile-wrapper">
                                <button
                                    className={`user-profile-btn ${isProfileOpen ? "active" : ""}`}
                                    onClick={toggleProfile}
                                >
                                    <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8QBdz0nBHXAoc5ua8dESzaPxRplUOW.png"
                                        alt="User"
                                        className="avatar"
                                    />
                                    <FaChevronDown size={12} className="dropdown-icon" />
                                </button>
                                {isProfileOpen && (
                                    <div className="profile-dropdown">
                                        <div className="dropdown-header">
                                            <img
                                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8QBdz0nBHXAoc5ua8dESzaPxRplUOW.png"
                                                alt="User"
                                                className="avatar"
                                            />
                                            <div className="user-info">
                                                <span className="name">Json Taylor</span>
                                                <span className="email">json.taylor@example.com</span>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link to="#" className="dropdown-item">
                                            <FaUser size={16} />
                                            <span>Profile</span>
                                        </Link>
                                        <Link to="#" className="dropdown-item">
                                            <FaCog size={16} />
                                            <span>Settings</span>
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link
                                            onClick={() => localStorage.clear()}
                                            to={path.login}
                                            className="dropdown-item text-danger"
                                        >
                                            <FaSignOutAlt size={16} />
                                            <span>Log Out</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
