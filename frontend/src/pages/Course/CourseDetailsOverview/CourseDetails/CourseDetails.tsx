import "./CourseDetails.css";
import CourseInfoSection from "./components/CourseInfoSection";
import FileSection from "./components/FileSection";
import ParticipantsSection from "./components/ParticipantsSection";
import UploadFileSection from "./components/UploadFileSection";
import {useCourseDetailsContext} from "./CourseDetailsProvider";
import {useLanguage} from "../../../../contexts/LanguageProviderContext";
import {FaSpinner} from "react-icons/fa";

const CourseDetails = () => {
    const {t} = useLanguage();
    const {loading, currentCourseDetails} = useCourseDetailsContext();

    if (loading) {
        return (
            <FaSpinner className="spinner"/>
        )
    }
    return (
        <>
            <h1 className="course-details-overview-title">
                {t("detailedOverviewForCourse")}: {currentCourseDetails?.name}
            </h1>

            <div className="content-grid">
                <CourseInfoSection/>

                <ParticipantsSection/>

                <FileSection/>
            </div>

            <div className="upload-section-container">
                <UploadFileSection document/>
                <UploadFileSection/>
            </div>
        </>
    );
};

export default CourseDetails;
