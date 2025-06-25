import {useCallback, useMemo, useState} from "react";
import type { FileType } from "../types";
import ItemList from "../../../components/ItemList/ItemList.tsx";
import type {ActionButton} from "../../../types.ts";
import {IoMdDownload} from "react-icons/io";
import {LuEye} from "react-icons/lu";
import {MdDelete} from "react-icons/md";
import {CourseDocumentsApi} from "../../../../../api/CourseDocumentsApi.tsx";
import {useCourseDetailsContext} from "../CourseDetailsProvider.tsx";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";
import {FaSpinner} from "react-icons/fa";



const FilesTable = ({ courseFiles }: { courseFiles: FileType[] }) => {
    const {fetchSingleCourse} = useCourseDetailsContext();
    const {showToast} = useToast();
    const [loading, setLoading] = useState(false);

    function handleFileClick(file: FileType) {
        window.open(`${file.courseId}/preview/${file.id}`, "_blank");
        return
    }

    const handleDeleteFile = useCallback(async (file: FileType) => {
        await CourseDocumentsApi.deleteDocument(file.courseId, file.id, setLoading, showToast);
        await fetchSingleCourse(file.courseId);
    }, []);

    const handleDownload = useCallback(async (file: FileType) => {
        await CourseDocumentsApi.downloadDocument(file.name, file.courseId, file.id, setLoading, showToast);
    }, []);

    const fileActions: ActionButton<FileType>[] = useMemo(() => [
        {
            icon: <IoMdDownload size={16} />,
            label: 'Download',
            onClick: (file: FileType) => handleDownload(file),
            variant: 'primary'
        },
        {
            icon: <LuEye size={16} />,
            label: 'Preview',
            onClick: (file: FileType) => handleFileClick(file),
            variant: 'secondary'
        },
        {
            icon: (loading ? (
                <FaSpinner size={20} className="animate-spin"/>
            ) : (
                <MdDelete size={20}/>
            )),
            label: 'Delete',
            onClick: (file: FileType) => handleDeleteFile(file),
            variant: 'danger'
        }
    ], []);

    return (
        <ItemList
            sectionTitle="Files"
            items={courseFiles}
            actions={fileActions}
            emptyMessage="Looks like there are no files yet."
        />
    );
};

export default FilesTable;
