import type React from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
    return (
        <footer className="admin-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <p>&copy; 2025 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
