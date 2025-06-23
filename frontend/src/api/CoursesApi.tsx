import type {Course} from "../pages/Course/types.ts";
import type {Dispatch, SetStateAction} from "react";
import type {ApiResultFormat, ToastType} from "../utils/types.ts";
import type {CourseFullTypes, CourseParticipantTypes} from "../utils/CourseTypes.ts";

const API_BASE_URL = "/courses";

export const CourseApi = {
    createCourse: async (
        data: Course,
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void,
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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                showToast(result?.message ?? "Failed to create course", "error");
                return;
            }

            showToast(result?.message ?? "Course created successfully", "success");
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
                headers: {"Content-Type": "application/json"},
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
    },

    getCourseId: async (
        id: string,
        setLoading: Dispatch<SetStateAction<boolean>>,
    ): Promise<CourseFullTypes[] | []> => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "GET",
            });
            const result: ApiResultFormat<CourseFullTypes[]> = await res.json();
            if (!res.ok) {
                return [];
            }
            return result?.data ?? [];
        } catch (error) {
            console.error("Error fetching course by ID:", error);
            return []
        } finally {
            setLoading(false);
        }
    },
    addCourseParticipant: async (courseId: string, userId: string, setLoading: Dispatch<SetStateAction<boolean>>, showToast: (message: string, type: ToastType) => void): Promise<void> => {
        setLoading(true);
        try {
            const CourseParticipantRequestPayload = {
                courseId: courseId,
                userId: userId
            }
            const res = await fetch(`/participants`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(CourseParticipantRequestPayload),
            });
            const result = await res.json();
            if (!res.ok) {
                showToast(result?.message ?? "Failed to add participant", "error");
                return;
            }
            showToast("Participant added successfully", "success");
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
    removeCourseParticipant: async (id: string, setLoading: Dispatch<SetStateAction<boolean>>, showToast: (message: string, type: ToastType) => void): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(`/participants/${id}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (!res.ok) {
                showToast(result?.message ?? "Failed to remove participant", "error");
                return;
            }
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
    fetchAllParticipants: async (): Promise<CourseParticipantTypes[]> => {
        try {
            const res = await fetch(`/participants`);
            const result: ApiResultFormat<CourseParticipantTypes[]> = await res.json();
            if (!res.ok) {
                throw new Error(result?.message || "Failed to fetch participants");
            }
            return result?.data ?? [];
        } catch (error) {
            throw error;
        }
    }
};
