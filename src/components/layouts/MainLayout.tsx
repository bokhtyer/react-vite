import { Outlet } from "react-router-dom";
import Header from "../client/header/Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet /> {/* Renders child routes */}
            </main>
            <footer>Your App Footer</footer>
        </>
    );
};

export default MainLayout;
