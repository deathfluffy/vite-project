import { useEffect, MouseEvent, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { Icon } from "../Icon/Icon";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose, children }) => {
  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(css.modalWrapper)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      document.addEventListener("keydown", handleKeyPress as unknown as EventListener);
    } else {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyPress as unknown as EventListener);
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyPress as unknown as EventListener);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <>
      {isOpen && (
        <div className={css.modal}>
          <div
            onClick={handleOutsideClick}
            className={css.modalWrapper}
            role="presentation"
          >
            <div className={css.modalContent}>
              <button className={css.modalCloseButton} onClick={onClose}>
                <Icon width="32" height="32" id="icon-x-close" />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};