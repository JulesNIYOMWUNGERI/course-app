import {createContext, type ReactNode, useContext, useMemo, useState} from 'react';
import type {ToastType} from "../utils/types.ts";



interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextProps {
    toasts: Toast[];
    showToast: (message: string, type?: ToastType) => void;
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = 'info') => {
        const id = toastId++;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const contextValues: ToastContextProps = useMemo(() => ({
        toasts,
        showToast,
        removeToast
    }), [toasts]);

    return (
        <ToastContext.Provider value={contextValues}>
            {children}
            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className="toast">
                        <div className={`toast-icon ${toast.type}`}>
                            {toast.type === 'success' && '✓'}
                            {toast.type === 'error' && '✕'}
                            {toast.type === 'warning' && '!'}
                            {toast.type === 'info' && 'i'}
                        </div>
                        <span className="toast-message">{toast.message}</span>
                        <button className="toast-close-button" onClick={() => removeToast(toast.id)}>
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
