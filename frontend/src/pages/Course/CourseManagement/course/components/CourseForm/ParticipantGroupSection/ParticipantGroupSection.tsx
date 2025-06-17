import { memo } from "react";

import { useLanguage } from "../../../../../../../contexts/LanguageProviderContext";
import type { FormErrors } from "../../../types";
import CheckboxGroup from "../../CheckboxGroup/CheckboxGroup";

interface ParticipantGroupSectionProps {
  formErrors: FormErrors;
}

const ParticipantGroupSection = ({
  formErrors,
}: ParticipantGroupSectionProps) => {
  const { t } = useLanguage();

  const groupOptions = [
    { value: "developers", label: t("developers") },
    { value: "managers", label: t("managers") },
    { value: "hr", label: t("hr") },
    { value: "administration", label: t("administration") },
  ];

  return (
    <section className="participant-group-section">
      <h3 className="section-title">{t("courseParticipantGroup")}</h3>
      <div className="participant-group-container">
        <CheckboxGroup options={groupOptions} name="participantGroups" />
        {formErrors.participantGroups && (
          <span className="error">{formErrors.participantGroups}</span>
        )}
      </div>
    </section>
  );
};

export default memo(ParticipantGroupSection);
