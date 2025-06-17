import { IoCloseSharp } from "react-icons/io5";
import "./Dialog.css";
import type { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Dialog = (props: DialogProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog">
        <div className="dialog-header">
          <h2>{props.title}</h2>
          <button className="close-button" onClick={props.onClose}>
            <IoCloseSharp />
          </button>
        </div>

        <div className="dialog-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Dialog;
