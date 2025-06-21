import {CourseDetailsProviderContext} from "../CourseDetailsOverview/CourseDetails/CourseDetailsProvider.tsx";
import {CourseFilesPreview} from "./CourseFilesPreview/CourseFilesPreview.tsx";

export function CourseFilePreviewPage() {
    return (
        <CourseDetailsProviderContext>
            <CourseFilesPreview/>
        </CourseDetailsProviderContext>
    )
}