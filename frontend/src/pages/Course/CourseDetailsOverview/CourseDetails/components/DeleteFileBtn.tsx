import type {FileType} from "../types.ts";
import {MdDelete} from "react-icons/md";
import {useCourseDetailsContext} from "../CourseDetailsProvider";
import {useCallback, useState} from "react";
import {CourseDocumentsApi} from "../../../../../api/CourseDocumentsApi.tsx";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";
import {FaSpinner} from "react-icons/fa";

const DeleteFileBtn = ({file}: { file: FileType }) => {
    const {fetchSingleCourse} = useCourseDetailsContext();
    const [loading, setLoading] = useState(false);
    const {showToast} = useToast();

    const handleDeleteFile = useCallback(async () => {
        await CourseDocumentsApi.deleteDocument(file.courseId, file.id, setLoading, showToast);
        await fetchSingleCourse(file.courseId);
    }, []);

    return (
        <button className="action-btn" onClick={handleDeleteFile}>
            {loading ? (
                <FaSpinner className="loading-spinner" size={20}/>
            ) : (
                <MdDelete size={20}/>
            )}
        </button>
    );
};

export default DeleteFileBtn;
