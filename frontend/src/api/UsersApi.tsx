import type { User } from "../pages/Administration/user/types";
import type {Dispatch, SetStateAction} from "react";
import type {ToastType} from "../utils/types.ts";

const API_BASE_URL = "/users";

export const Api = {
    createUser: async (
        data: User,
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void,
        onClose: () => void
    ): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/new`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                showToast(result?.message || "Failed to create user", "error");
                return;
            }

            showToast(result?.message || "User created successfully", "success");
            onClose();
        } catch (error: any) {
            showToast(error.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    },

    fetchAllUsers: async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void,
        setUsers: Dispatch<SetStateAction<User[]>>
    ): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/all`);
            const result = await res.json();

            if (!res.ok) {
                showToast(result?.message || "Failed to fetch users", "error");
                return;
            }

            setUsers(result?.data || []);
        } catch (error: any) {
            showToast(error.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    },
    updateUser: async (
        id: string,
        data: User,
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void,
        onClose: () => void
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
                showToast(result?.message || "Failed to update user", "error");
                return;
            }

            showToast(result?.message || "User updated successfully", "success");
            onClose();
        } catch (error: any) {
            showToast(error.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    },
    deleteUser: async (
        id: string,
        setLoading: Dispatch<SetStateAction<boolean>>,
        showToast: (message: string, type: ToastType) => void,
        onClose: () => void
    ): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (!res.ok) {
                showToast(result?.message || "Failed to delete user", "error");
                return;
            }

            showToast(result?.message || "User deleted successfully", "success");
            onClose();
        } catch (error: any) {
            showToast(error.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    },
};
