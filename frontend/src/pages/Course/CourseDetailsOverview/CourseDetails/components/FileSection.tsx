import {useMemo} from "react";
import {useCourseDetailsContext} from "../CourseDetailsProvider";
import FilesTable from "./FilesTable";
import type {FileType} from "../types.ts";
import {useLanguage} from "../../../../../contexts/LanguageProviderContext.tsx";

const FileSection = () => {
    const {t} = useLanguage();
    const {currentCourseDetails, courseFiles} = useCourseDetailsContext();

    const currentCourseFiles: FileType[] = useMemo(() => {
        return courseFiles.filter(
            (file) => file.courseId === currentCourseDetails?.id
        );
    }, [courseFiles, currentCourseDetails]);

    return (
        <section className="info-card">
            <h3 className="card-title">{t("files")}</h3>

            <FilesTable courseFiles={currentCourseFiles}/>
        </section>
    );
};

export default FileSection;
