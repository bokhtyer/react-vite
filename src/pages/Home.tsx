import { useTranslation } from "react-i18next";
import { webSiteTitle } from "../helper/helper";

// create home page
const Home = () => {
    const { t } = useTranslation();
    webSiteTitle("Home");
    return (
        <div>
            <h1>Home</h1>
            <p>{t("welcome")}</p>
        </div>
    );
};
export default Home;
