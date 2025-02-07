import { Outlet } from "react-router-dom";
import "./css/MainLayout.scss";
import Header from "../client/header/Header";
import Footer from "../client/footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="main-wrapper">
                <Outlet /> {/* Renders child routes */}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
