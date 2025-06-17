import { memo } from "react";

import { useLanguage } from "../../../../../../../contexts/LanguageProviderContext";
import RadioGroup from "../../RadioGroup/RadioGroup";

const ClassificationSection = () => {
  const { t } = useLanguage();

  const classificationOptions = [
    { value: "technical", label: t("technical") },
    { value: "softSkills", label: t("softSkills") },
    { value: "business", label: t("business") },
  ];

  return (
    <section className="classification-section">
      <h3 className="section-title">{t("courseClassification")}</h3>
      <div className="classification-container">
        <RadioGroup
          name="classification"
          options={classificationOptions}
          defaultValue="technical"
        />
      </div>
    </section>
  );
};

export default memo(ClassificationSection);
