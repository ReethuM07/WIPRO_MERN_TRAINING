import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100
                 d-flex align-items-center justify-content-center
                 bg-dark bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-3"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="btn-close float-end"
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    modalRoot
  );
}
