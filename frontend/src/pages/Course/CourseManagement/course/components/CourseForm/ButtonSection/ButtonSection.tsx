import {useLanguage} from "../../../../../../../contexts/LanguageProviderContext";
import {useCourseManagementContext} from "../../../CourseManagementProviderContext";

interface ButtonSectionProps {
    onCancel: () => void;
    loading: boolean
}

const ButtonSection = ({onCancel, loading}: ButtonSectionProps) => {
    const {courseNameFilter} = useCourseManagementContext();
    const {t} = useLanguage();

    return (
        <div className="button-container">
            <button
                type="submit"
                disabled={courseNameFilter.length > 0 || loading}
                className={`${(courseNameFilter || loading) ? "disabled" : ""} new-course-btn`}
            >
                {loading ? t("creating") || "Creating..." : t("createNewCourse") || "Create New Course"}
            </button>
            <button
                type="submit"
                disabled={courseNameFilter.length === 0 || loading}
                className={`${(!courseNameFilter || loading) ? "disabled" : ""} save-btn`}
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
