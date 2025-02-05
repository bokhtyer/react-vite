import type React from "react";
import { FaLock, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./css/ErrorPage.scss";

const UnauthorizedPage: React.FC = () => {
    return (
        <div className="error-page unauthorized-page d-flex align-items-center justify-content-center">
            <div className="text-center">
                <div className="error-icon mb-4">
                    <FaLock size={80} />
                </div>
                <h1 className="error-code mb-4">403</h1>
                <h2 className="error-message mb-4">Access Denied</h2>
                <p className="error-description mb-4">Sorry, you don't have permission to access this page.</p>
                <Link to="/" className="btn btn-primary btn-lg">
                    <FaHome className="me-2" /> Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
