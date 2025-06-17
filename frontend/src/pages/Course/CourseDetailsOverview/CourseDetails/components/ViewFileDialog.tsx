import Dialog from "../../../../../components/Dialog/Dialog";
import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import type { FileType } from "../types";

interface ViewFileDialogProps {
    file: FileType;
    onClose: () => void;
}

const ViewFileDialog = ({ file, onClose }: ViewFileDialogProps) => {
    const { t } = useLanguage();
    return (
        <Dialog isOpen={true} onClose={onClose} title={t(`imagePreview`)}>
            <div className="file-viewer">
                <img src={file.url} alt={file.name} className="current-preview-image" />
            </div>
        </Dialog>
    );
};

export default ViewFileDialog;
