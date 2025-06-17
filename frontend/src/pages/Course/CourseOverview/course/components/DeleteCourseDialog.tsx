import Dialog from "../../../../../components/Dialog/Dialog";
import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import { useCourseContext } from "../../../CourseProviderContext";
import type { Course } from "../../../types";

interface DeleteDialogProps {
  course: Course;
  onClose: () => void;
}

function DeleteCourseDialog({ course, onClose }: DeleteDialogProps) {
  const { setCourseData } = useCourseContext();
  const { t } = useLanguage();

  const deleteCourse = () => {
    setCourseData((prev) => prev.filter((c) => c.id !== course.id));
    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose} title={t(`alert`)}>
      <div className="container">
        <span>{t("areYouSureYouWantToDeleteThisCourse")}?</span>
        <div className="button-actions">
          <button type="button" className="btns" onClick={deleteCourse}>
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
