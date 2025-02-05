import { useTranslation } from "react-i18next";

const AdminList = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("adminList")}</h1>
        </div>
    );
};

export default AdminList;
