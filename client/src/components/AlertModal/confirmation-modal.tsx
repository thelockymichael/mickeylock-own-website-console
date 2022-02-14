import React, { FunctionComponent } from "react";
import "./confirmation-modal.css";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = (
  props
) => {
  return (
    <React.Fragment>
      <div className="message">{props.message}</div>
      <div className="confirmation-buttons">
        <button className="yes-button" onClick={props.onConfirm}>
          Yes
        </button>
        <button className="no-button" onClick={props.onCancel}>
          No
        </button>
      </div>
    </React.Fragment>
  );
};
