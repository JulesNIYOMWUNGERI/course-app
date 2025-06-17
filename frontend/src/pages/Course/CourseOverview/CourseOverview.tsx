import { useState } from "react";

import ToggleSwitch from "./course/components/ToggleSwitch";
import CourseTable from "./course/CourseTable";
import { useLanguage } from "../../../contexts/LanguageProviderContext";
import "./CourseOverview.css";

const CourseOverview = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const { t } = useLanguage();

  return (
    <main className="course-overview">
      <h1 className="course-overview-title">{t("courseOverview")}</h1>

      <ToggleSwitch
        showAllCourses={showAllCourses}
        setShowAllCourses={setShowAllCourses}
      />

      <CourseTable showAllCourses={showAllCourses} />
    </main>
  );
};

export default CourseOverview;
