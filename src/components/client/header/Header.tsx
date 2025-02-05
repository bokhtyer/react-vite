import React from "react";
import "./Header.scss";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";

const Header: React.FC = () => {
    return (
        <header className="bg-light">
            <nav className="navbar navbar-expand-lg navbar-light container">
                <a className="navbar-brand" href="#">
                    <img src="/path-to-logo.png" alt="Logo" width="30" height="30" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Features
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Pricing
                            </a>
                        </li>
                    </ul>
                    <LanguageSwitcher />
                    <button className="btn btn-outline-success" type="button">
                        Login
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
