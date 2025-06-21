import Dialog from "../../../../../components/Dialog/Dialog";
import {useLanguage} from "../../../../../contexts/LanguageProviderContext";
import type {FileType} from "../types";

interface ViewFileDialogProps {
    file: FileType;
    onClose: () => void;
}

const ViewFileDialog = ({file, onClose}: ViewFileDialogProps) => {
    const {t} = useLanguage();
    console.log(file);
    return (
        <Dialog isOpen={true} onClose={onClose} title={t(`imagePreview`)}>
            <div className="file-viewer">
            </div>
        </Dialog>
    );
};

export default ViewFileDialog;
