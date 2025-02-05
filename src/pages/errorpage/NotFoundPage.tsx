import type React from "react";
import { FaSearch, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./css/ErrorPage.scss";

const NotFoundPage: React.FC = () => {
    return (
        <div className="error-page not-found-page d-flex align-items-center justify-content-center">
            <div className="text-center">
                <div className="error-icon mb-4">
                    <FaSearch size={80} />
                </div>
                <h1 className="error-code mb-4">404</h1>
                <h2 className="error-message mb-4">Page Not Found</h2>
                <p className="error-description mb-4">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="btn btn-primary btn-lg">
                    <FaHome className="me-2" /> Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
