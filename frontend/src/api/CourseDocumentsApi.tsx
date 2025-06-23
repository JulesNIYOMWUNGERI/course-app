import type {Dispatch, SetStateAction} from "react";
import type {ApiResultFormat, ToastType} from "../utils/types.ts";
import type {CourseDocuments} from "../utils/CourseTypes.ts";

function BaseURL(courseId: string): string {
    return `/courses/${courseId}/files`;
}

export const CourseDocumentsApi = {
    uploadDocument: async (courseId: string, file: File,
                           setLoading: Dispatch<SetStateAction<boolean>>,
                           showToast: (message: string, type: ToastType) => void,
    ) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(BaseURL(courseId), {
                method: 'POST',
                body: formData,
            });
            const result: ApiResultFormat<CourseDocuments> = await response.json();
            if (!response.ok) {
                showToast(result?.message ?? "Failed to create course", "error");
                return;
            }
            showToast(result?.message ?? "Course created successfully", "success");
            return result;
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message, "error");
            } else {
                showToast("Something went wrong", "error");
            }
        } finally {
            setLoading(false);
        }
    },
    deleteDocument: async (courseId: string, documentId: string, setLoading: Dispatch<SetStateAction<boolean>>, showToast: (message: string, type: ToastType) => void) => {
        try {
            const response = await fetch(`${BaseURL(courseId)}/${documentId}`, {
                method: 'DELETE',
            });
            const result: ApiResultFormat<CourseDocuments> = await response.json();
            if (!response.ok) {
                showToast(result?.message ?? "Failed to delete document", "error");
                return;
            }
            showToast(result?.message ?? "Document deleted successfully", "success");
            return result;
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message, "error");
            } else {
                showToast("Something went wrong", "error");
            }

        } finally {
            setLoading(false);
        }
    },
    previewDocument: async (courseId: string, documentId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, showToast: (message: string, type: ToastType) => void) => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseURL(courseId)}/${documentId}/preview`, {
                method: 'GET',
            });
            if (!response.ok) {
                showToast("Failed to preview document", "error");
                return;
            }
            const blob: Blob = await response.blob();
            const url: string = URL.createObjectURL(blob);
            return url;
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message, "error");
            } else {
                showToast("Something went wrong", "error");
            }
        } finally {
            setLoading(false);
        }
    },
    downloadDocument: async (name: string, courseId: string, documentId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, showToast: (message: string, type: ToastType) => void) => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseURL(courseId)}/${documentId}/download`, {
                method: 'GET',
            });
            if (!response.ok) {
                showToast("Failed to download document", "error");
                return;
            }
            const blob: Blob = await response.blob();
            const url: string = URL.createObjectURL(blob);
            const a: HTMLAnchorElement = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast("Document downloaded successfully", "success");
            return url;
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message, "error");
            } else {
                showToast("Something went wrong", "error");
            }
        } finally {
            setLoading(false);
        }
    }
}