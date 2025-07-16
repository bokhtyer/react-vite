import { useTranslation } from "react-i18next";
import { webSiteTitle } from "../helper/helper";

// create home page
const Home = () => {
    const { t } = useTranslation();
    webSiteTitle("Home");
    return (
        <div className="pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Home</h1>
                        <h3>{t("welcome")}</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo praesentium itaque, culpa
                            veritatis eos architecto autem doloremque esse aspernatur, cum vitae hic. Iusto magni
                            inventore earum, animi doloribus dignissimos quo quia? Neque, perferendis? Architecto
                            eveniet vel delectus consequatur, cupiditate odit officiis ipsam quod praesentium eaque
                            nesciunt qui accusantium eius. Veritatis, quaerat aspernatur vitae quae iusto sit at nihil,
                            odio, exercitationem dolores magni minima temporibus maiores iste ratione laboriosam
                            provident natus possimus porro doloribus odit. Soluta vero saepe animi. Nam, tempora et
                            architecto tenetur illum quam ea sunt iste, beatae doloribus debitis odit reprehenderit
                            neque autem vitae exercitationem totam maiores labore?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
