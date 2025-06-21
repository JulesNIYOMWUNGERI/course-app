import React, {useRef, useState} from "react";
import {MdDelete, MdOutlineUploadFile} from "react-icons/md";
import {useCourseDetailsContext} from "../CourseDetailsProvider";
import {CourseDocumentsApi} from "../../../../../api/CourseDocumentsApi.tsx";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";
import {FaSpinner} from "react-icons/fa";

interface UploadFileSectionProps {
    document?: boolean;
}

type UploadedFile = {
    file: File;
    preview: string;
};

const UploadFileSection = ({document}: UploadFileSectionProps) => {
    const {fetchSingleCourse} = useCourseDetailsContext();
    const [selectedFile, setSelectedFile] = useState<UploadedFile>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {currentCourseDetails} = useCourseDetailsContext();
    const [loading, setLoading] = useState<boolean>(false);
    const {showToast} = useToast();

    const handleDocumentUpload = async () => {
        if (selectedFile) {
            if (!currentCourseDetails?.id) {
                showToast("No course selected", "error");
                return;
            }
            await CourseDocumentsApi.uploadDocument(currentCourseDetails?.id, selectedFile.file, setLoading, showToast)
            await fetchSingleCourse(currentCourseDetails.id);
            setSelectedFile(undefined);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile({
                    file,
                    preview: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteFile = () => {
        setSelectedFile(undefined);
    };

    return (
        <section className="upload-section">
            <h3 className="section-title">{`Upload ${document ? "document" : "photo"}`}</h3>
            <div className="action-container">
                <span className="upload-subtitle">{`Add ${document ? "documents" : "photos"} to course`}</span>
                <button onClick={handleDocumentUpload} className="add-file-button">
                    {loading ? (
                        <FaSpinner className="spinner" size={18}/>
                    ) : (
                        "Add"
                    )}
                </button>
            </div>
            <div className="file-list-container">
                <div className="file-item">
                    <div className="file-name">
                        {!selectedFile ? "No file..." : selectedFile.file.name}
                    </div>

                    {selectedFile && (
                        <button className="trash-button" onClick={handleDeleteFile}>
                            <MdDelete size={20}/>
                        </button>
                    )}
                </div>
            </div>

            <div className="upload-dropzone" onClick={openFileDialog}>
                {!document && selectedFile && selectedFile.preview ? (
                    <div className="preview-container">
                        <img
                            src={selectedFile.preview}
                            alt="preview"
                            className="preview-image"
                        />
                    </div>
                ) : (
                    <div className="dropzone-content">
                        <div className="upload-icon">
                            <MdOutlineUploadFile size={30}/>
                            <div className="upload-text">Upload a file</div>
                        </div>
                        <p className="dropzone-instructions">
                            {`Drag and drop your file here or click to browse your device. ${document ? "(.doc, .docx, .ppt, .pptx, .txt, .pdf)" : "(image/png, image/gif, image/jpeg)"} `}
                        </p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="file-input"
                            onChange={handleFileSelect}
                            accept={document ? ".pdf" : "image/png,image/gif,image/jpeg"}
                            id="document-upload"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default UploadFileSection;
