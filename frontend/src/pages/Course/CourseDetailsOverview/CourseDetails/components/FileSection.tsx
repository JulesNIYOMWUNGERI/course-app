import { useMemo } from "react";
import { useCourseDetailsContext } from "../CourseDetailsProvider";
import FilesTable from "./FilesTable";

const FileSection = () => {
    const { currentCourseDetails, courseFiles } = useCourseDetailsContext();

    const currentCourseFiles = useMemo(() => {
        return courseFiles.filter(
            (file) => file.courseId === currentCourseDetails?.id
        );
    }, [courseFiles, currentCourseDetails]);

    return (
        <section className="info-card">
            <h3 className="card-title">Files</h3>

            <FilesTable courseFiles={currentCourseFiles} />
        </section>
    );
};

export default FileSection;
