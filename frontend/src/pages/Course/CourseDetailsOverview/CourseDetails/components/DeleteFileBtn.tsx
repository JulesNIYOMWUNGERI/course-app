import type {FileType} from "../types.ts";
import { MdDelete } from "react-icons/md";
import { useCourseDetailsContext } from "../CourseDetailsProvider";

const DeleteFileBtn = ({ file }: { file: FileType }) => {
    const { setCourseFiles } = useCourseDetailsContext();

    const handleDeleteFile = () => {
        setCourseFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id));
    };
    return (
        <button className="action-btn" onClick={handleDeleteFile}>
            <MdDelete size={20} />
        </button>
    );
};

export default DeleteFileBtn;
