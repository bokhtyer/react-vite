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
                        <h3 className="text-2xl text-blue-500">{t("welcome")}</h3>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">React + Vite + Tailwind</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            A modern development stack for building fast, beautiful web applications
                        </p>
                        <p className="text-2xl text-red-200">
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
            <div className="text-3xl text-red-600 font-bold">Tailwind should be working!</div>
            <button className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Submit</button>

            <button className="bg-sky-700 rounded-md px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
                Submit
            </button>
        </div>
    );
};
export default Home;
