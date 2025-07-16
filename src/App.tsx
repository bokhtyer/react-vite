import type React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./i18n";

import MainRoutes from "./routes/MainRoutes";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
const App: React.FC = () => {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <MainRoutes />
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
};

export default App;
