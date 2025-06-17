import { useState } from "react";
import type { FileType } from "../types";
import { LuEye } from "react-icons/lu";
import ViewFileDialog from "./ViewFileDialog";

const ViewBtn = ({ file }: { file: FileType }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="action-btn" onClick={() => setOpen(true)}>
                <LuEye size={20} />
            </button>
            {open && <ViewFileDialog file={file} onClose={() => setOpen(false)} />}
        </>
    );
};

export default ViewBtn;
