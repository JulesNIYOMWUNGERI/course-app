import { memo } from "react";
import type { FileType } from "../types";
import DeleteFileBtn from "./DeleteFileBtn";
import DownloadBtn from "./DownloadBtn";
import ViewBtn from "./ViewBtn";

export default memo(({ file }: { file: FileType }) => {
    return (
        <div className="action-buttons">
            <ViewBtn file={file} />
            <DownloadBtn file={file} />
            <DeleteFileBtn file={file} />
        </div>
    );
});
