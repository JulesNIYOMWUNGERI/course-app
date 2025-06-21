import {IoMdDownload} from "react-icons/io";
import type {FileType} from "../types";
import {useCallback, useState} from "react";
import {CourseDocumentsApi} from "../../../../../api/CourseDocumentsApi.tsx";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";

const DownloadBtn = ({file}: { file: FileType }) => {
    const [loading, setLoading] = useState(false);
    const {showToast} = useToast();

    const handleDownload = useCallback(async () => {
        await CourseDocumentsApi.downloadDocument(file.name, file.courseId, file.id, setLoading, showToast);
    }, []);

    return (
        <button className="action-btn" onClick={handleDownload}>
            {loading ? <IoMdDownload className="loading-spinner" size={20}/> : <IoMdDownload size={20}/>}
        </button>
    );
};

export default DownloadBtn;
