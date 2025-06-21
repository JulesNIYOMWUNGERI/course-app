import "./CoursesFilesPreview.css";
import {useCallback, useEffect, useState} from "react";
import {CourseDocumentsApi} from "../../../../api/CourseDocumentsApi.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useToast} from "../../../../contexts/ToastProvider.tsx";
import {FaSpinner} from "react-icons/fa";

export function CourseFilesPreview() {
    const {fileId, id: courseId} = useParams()
    const [loading, setLoading] = useState(false)
    const {showToast} = useToast()
    const [blob, setBlob] = useState<string>()
    const router = useNavigate()

    useEffect(() => {
        handleShowDocument()
    }, []);

    const handleShowDocument = useCallback(async () => {
        if (!courseId || !fileId) {
            router(-1)
            return
        }
        const fileBlob = await CourseDocumentsApi.previewDocument(courseId, fileId, setLoading, showToast)
        setBlob(fileBlob)
    }, [])

    if (loading) {
        return (
            <FaSpinner className="loading-spinner" size={20}/>
        )
    }


    return (
        <div className={"course-file-preview-page"}>
            <iframe
                src={blob}
                title={"Preview Page"}
                width="100%"
                height="100%"
            />
        </div>
    );
}
