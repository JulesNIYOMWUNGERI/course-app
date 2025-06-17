import UserTable from "./user/UserTable";
import { useLanguage } from "../../contexts/LanguageProviderContext";
import "./Administration.css";

const Administration = () => {
  const { t } = useLanguage();
  return (
    <main className="admins-container">
      <h1 className="admin-title">{t("administration")}</h1>
      <UserTable />
    </main>
  );
};

export default Administration;
