import type {FileType} from "../types";
import {LuEye} from "react-icons/lu";

const ViewBtn = ({file}: { file: FileType }) => {
    function handleFileClick() {
        window.open(`${file.courseId}/preview/${file.id}`, "_blank");
        return
    }

    return (
        <button className="action-btn" onClick={handleFileClick}>
            <LuEye size={20}/>
        </button>
    );
};

export default ViewBtn;
