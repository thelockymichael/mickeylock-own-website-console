import React, { useEffect, useCallback } from "react";
import FocusLock from "react-focus-lock";
import ReactDOM from "react-dom";

import "./modal.css";

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerText: string;
}

export const Modal: React.FC<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
}) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 27 && isShown) {
        hide();
      }
    },
    [hide, isShown]
  );

  useEffect(() => {
    isShown
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    document.addEventListener("keydown", onKeyDown, false);

    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [isShown, onKeyDown]);

  const modal = (
    <>
      <div className="backdrop" onClick={hide} />
      <FocusLock>
        <div
          aria-modal
          aria-labelledby={headerText}
          tabIndex={-1}
          role="dialog"
          className="wrapper-modal"
        >
          <div className="styled-modal">
            <div className="header">
              <div className="header-text">{headerText}</div>
              <button
                data-dismiss="modal"
                aria-label="Close"
                className="close-button"
                onClick={hide}
              >
                X
              </button>
            </div>
            <div className="content">{modalContent}</div>
          </div>
        </div>
      </FocusLock>
    </>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
