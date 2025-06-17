import { memo } from "react";

import { InputField } from "../../../../../../../components";
import { useLanguage } from "../../../../../../../contexts/LanguageProviderContext";
import type { FormErrors } from "../../../types";

interface BasicDataSectionProps {
  formErrors: FormErrors;
}

const BasicDataSection = ({ formErrors }: BasicDataSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="basic-data-section">
      <h3 className="section-title">{t("basicData")}</h3>
      <div className="basic-data-container">
        <div className="course-name-input">
          <InputField
            id="courseName"
            placeholder={t("courseName")}
            type="text"
            defaultValue=""
            name="courseName"
            inputStyles="input-field"
            inputContainerStyles="input-container"
          />
          {formErrors.courseName && (
            <span className="error">{formErrors.courseName}</span>
          )}
        </div>
        <div className="participants-count">
          <InputField
            id="numberOfParticipants"
            placeholder={t("numberOfParticipants")}
            type="number"
            defaultValue={0}
            name="numberOfParticipants"
            inputStyles="input-field"
            inputContainerStyles="input-container"
          />
          {formErrors.numberOfParticipants && (
            <span className="error">{formErrors.numberOfParticipants}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(BasicDataSection);
