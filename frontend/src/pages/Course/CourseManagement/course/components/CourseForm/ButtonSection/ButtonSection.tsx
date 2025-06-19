import { useState } from "react";
import { useLanguage } from "../../../../../../../contexts/LanguageProviderContext";
import { useCourseManagementContext } from "../../../CourseManagementProviderContext";
import { CourseApi } from "../../../../../../../api/CoursesApi.tsx";
import type { Course } from "../../../../../types.ts";
import { useToast } from "../../../../../../../contexts/ToastProvider";
import { useCourseContext } from "../../../../../CourseProviderContext";

interface ButtonSectionProps {
  onCancel: () => void;
  formRef: React.RefObject<HTMLFormElement>;
}

const ButtonSection = ({ onCancel, formRef }: ButtonSectionProps) => {
  const { courseNameFilter } = useCourseManagementContext();
  const { fetchCourses } = useCourseContext();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const getCheckedParticipantGroups = (): string[] => {
    const checkboxes = formRef.current?.querySelectorAll<HTMLInputElement>(
      'input[name="participantGroups"]:checked',
    );
    return checkboxes ? Array.from(checkboxes).map((cb) => cb.value) : [];
  };

  const validateForm = (): Course | null => {
    if (!formRef.current) return null;
    
    const form = formRef.current;
    const courseName = form.courseName.value.trim();
    const numberOfParticipants = Number(form.numberOfParticipants.value);
    const participantGroups = getCheckedParticipantGroups();

    if (!courseName) {
      showToast("Course name is required", "error");
      return null;
    }

    if (!numberOfParticipants || numberOfParticipants <= 0) {
      showToast("Number of participants must be a positive number", "error");
      return null;
    }

    if (participantGroups.length === 0) {
      showToast("Select at least one participant group", "error");
      return null;
    }

    return {
      id: courseNameFilter || crypto.randomUUID(),
      name: courseName,
      classification: form.classification.value,
      department: form.department.value,
      participantsGroup: participantGroups,
      numberOfParticipants,
    };
  };

  const handleCreateCourse = async () => {
    const courseData = validateForm();
    if (!courseData) return;

    setLoading(true);
    try {
      await CourseApi.createCourse(
        courseData,
        setLoading,
        showToast,
        () => {
          onCancel();
          fetchCourses();
        }
      );
    } catch (error) {
      console.error("Error creating course:", error);
      setLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    const courseData = validateForm();
    if (!courseData || !courseData.id) return;

    setLoading(true);
    try {
      await CourseApi.updateCourse(
        courseData.id,
        courseData,
        setLoading,
        showToast
      );
      fetchCourses();
      onCancel();
    } catch (error) {
      console.error("Error updating course:", error);
      setLoading(false);
    }
  };

  return (
    <div className="button-container">
      <button
        type="button"
        disabled={courseNameFilter.length > 0 || loading}
        className={`${(courseNameFilter || loading) ? "disabled" : ""} new-course-btn`}
        onClick={() => handleCreateCourse()}
      >
        {loading ? t("creating") || "Creating..." : t("createNewCourse") || "Create New Course"}
      </button>
      <button
        type="button"
        disabled={courseNameFilter.length === 0 || loading}
        className={`${(!courseNameFilter || loading) ? "disabled" : ""} save-btn`}
        onClick={() => handleSaveCourse()}
      >
        {loading ? t("saving") || "Saving..." : t("save") || "Save"}
      </button>
      <button 
        type="button" 
        onClick={() => onCancel()} 
        className="cancel-btn"
        disabled={loading}
      >
        {t("cancel") || "Cancel"}
      </button>
    </div>
  );
};

export default ButtonSection;
