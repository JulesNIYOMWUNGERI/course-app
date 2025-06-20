import type { Course } from "../pages/Course/types.ts";
import type { Dispatch, SetStateAction } from "react";
import type { ToastType } from "../utils/types.ts";

const API_BASE_URL = "/courses";

export const CourseApi = {
    createCourse: async (
        data: Course,
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void,
        onClose: () => void
    ): Promise<void> => {
        setLoading(true);
        try {
            const payload = {
                name: data.name,
                numberOfParticipants: data.numberOfParticipants,
                classification: data.classification,
                department: data.department,
                participantsGroup: data.participantsGroup || []
            };
            
            const res = await fetch(`${API_BASE_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                showToast(result?.message || "Failed to create course", "error");
                return;
            }

            showToast(result?.message || "Course created successfully", "success");
            onClose();
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

    fetchAllCourses: async (): Promise<Course[]> => {
        try {
            const res = await fetch(`${API_BASE_URL}`);
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.message || "Failed to fetch courses");
            }
            if (result?.data) {
                return result.data.data;
            } else if (Array.isArray(result)) {
                return result;
            } else {
                return [];
            }
        } catch (error) {
            throw error;
        }
    },

    updateCourse: async (
        id: string,
        data: Course,
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void
    ): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                showToast(result?.message || "Failed to update course", "error");
                return;
            }

            showToast("Course updated successfully", "success");
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

    deleteCourse: async (
        id: string,
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void
    ): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE"
            });

            const result = await res.json();

            if (!res.ok) {
                showToast(result?.message || "Failed to delete course", "error");
                return;
            }

            showToast("Course deleted successfully", "success");
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
};
