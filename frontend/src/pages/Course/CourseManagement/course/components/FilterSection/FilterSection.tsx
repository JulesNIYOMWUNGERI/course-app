import { useLanguage } from "../../../../../../contexts/LanguageProviderContext";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { departmentOptions } from "../../constants";
import "./FilterSection.css";
import { useCourseManagementContext } from "../../CourseManagementProviderContext";

const FilterSection = () => {
  const { t } = useLanguage();
  const {
    courseNameFilter,
    courseDepartmentFilter,
    courseClassificationFilter,
    courseNameOptions,
    setCourseNameFilter,
    setCourseDepartmentFilter,
    setCourseClassificationFilter,
  } = useCourseManagementContext();

  const handleCourseNameFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => setCourseNameFilter(e.target.value);

  const handleCourseDepartmentFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCourseDepartmentFilter(e.target.value);
    setCourseNameFilter("");
  };

  const handleCourseClassificationFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCourseClassificationFilter(e.target.value);
    setCourseNameFilter("");
  };

  const classificationOptions = [
    { label: t("all"), value: "all" },
    { label: t("technical"), value: "technical" },
    { label: t("softSkills"), value: "softSkills" },
    { label: t("business"), value: "business" },
  ];

  return (
    <section className="filter-section">
      <h3 className="section-title">{t("filter")}</h3>
      <div className="filters-container">
        <Dropdown
          options={courseNameOptions}
          value={courseNameFilter}
          onChange={handleCourseNameFilterChange}
          placeholder={t("courseName")}
        />
        <Dropdown
          options={departmentOptions}
          value={courseDepartmentFilter}
          onChange={handleCourseDepartmentFilterChange}
          placeholder={t("courseDepartment")}
        />
        <Dropdown
          options={classificationOptions}
          value={courseClassificationFilter}
          onChange={handleCourseClassificationFilterChange}
          placeholder={t("courseClassification")}
        />
      </div>
    </section>
  );
};

export default FilterSection;
