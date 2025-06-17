import { IoMdDownload } from "react-icons/io";
import type { FileType } from "../types";

const DownloadBtn = ({ file }: { file: FileType }) => {
    console.log("DownloadBtn file", file);
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = file.url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button className="action-btn" onClick={handleDownload}>
            <IoMdDownload size={20} />
        </button>
    );
};

export default DownloadBtn;
