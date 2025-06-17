import { memo } from "react";

import { useLanguage } from "../../../../../../../contexts/LanguageProviderContext";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import { departmentOptions } from "../../../constants";

const DepartmentSection = () => {
  const { t } = useLanguage();

  return (
    <section className="department-section">
      <h3 className="section-title">{t("courseDepartment")}</h3>
      <Dropdown options={departmentOptions} placeholder="All" />
    </section>
  );
};

export default memo(DepartmentSection);
