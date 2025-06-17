import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import { useCourseDetailsContext } from "../CourseDetailsProvider";

const CourseInfoSection = () => {
  const { t } = useLanguage();
  const { currentCourseDetails } = useCourseDetailsContext();

  return (
    <section className="info-card">
      <h3 className="card-title">{t("courseInformation")}</h3>
      <div className="info-container">
        <div className="info-row">
          <div className="info-label">{t("courseName")}</div>
          <div className="info-value">{currentCourseDetails?.name}</div>
        </div>
        <div className="info-row">
          <div className="info-label">{t("courseClassification")}</div>
          <div className="info-value">
            {currentCourseDetails?.classification}
          </div>
        </div>
        <div className="info-row">
          <div className="info-label">{t("courseDepartment")}</div>
          <div className="info-value">{currentCourseDetails?.department}</div>
        </div>
        <div className="info-row">
          <div className="info-label">{t("numberOfParticipants")}</div>
          <div className="info-value">
            {currentCourseDetails?.numberOfParticipants}
          </div>
        </div>
        <div className="info-row">
          <div className="info-label">{t("courseParticipantGroup")}</div>
          <div className="group-info-value">
            {Array.isArray(currentCourseDetails?.participantGroups)
              ? currentCourseDetails.participantGroups.join(", ")
              : currentCourseDetails?.participantGroups}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfoSection;
