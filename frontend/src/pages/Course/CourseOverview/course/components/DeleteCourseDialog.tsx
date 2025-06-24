import Dialog from "../../../../../components/Dialog/Dialog";
import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import { useCourseContext } from "../../../CourseProviderContext";
import type { Course } from "../../../types";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";
import {useState} from "react";
import {CourseApi} from "../../../../../api/CoursesApi.tsx";

interface DeleteDialogProps {
  course: Course;
  onClose: () => void;
}

function DeleteCourseDialog({ course, onClose }: DeleteDialogProps) {
  const { fetchCourses } = useCourseContext();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const deleteCourse =  async () => {
    if(course.id) {
      await CourseApi.deleteCourse(
        course.id,
          setLoading,
          showToast,
        onClose
      );
     await fetchCourses();

    }

  };

  return (
    <Dialog isOpen={true} onClose={onClose} title={t(`alert`)}>
      <div className="container">
        <span>{t("areYouSureYouWantToDeleteThisCourse")}?</span>
        <div className="button-actions">
          <button type="button" className="btns" onClick={deleteCourse} disabled={loading}>
            {t("yes")}
          </button>
          <button type="submit" className="btns" onClick={onClose}>
            {t("no")}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteCourseDialog;
