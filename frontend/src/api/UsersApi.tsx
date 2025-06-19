import type {User} from "../pages/Administration/user/types.ts";
import type {Dispatch, SetStateAction} from "react";
import type {ToastType} from "../utils/types.ts";

export function handleUserSubmit(
    data: User,
    setLoading: Dispatch<SetStateAction<boolean>>,
    showToast: (message: string, type: ToastType) => void,
    onClose: () => void
) {
    setLoading(true);

    fetch("/users/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            const message = data?.message || `Failed to create user`;
            showToast(message, "error");
            return;
        }

        showToast(data?.message, "success");
        onClose()
    }).catch((error) => {
        showToast(error.message || "Something went wrong", "error");
    }).finally(() => {
        setLoading(false)
    });
}