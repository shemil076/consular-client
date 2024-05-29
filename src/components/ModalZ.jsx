import { useEffect, useState } from "react";

export default function ModalZ(props) {
  let { show, title, children, onOk, onCancel } = props;

  return (
    <div className={`modal-z ${show ? "modal-z-open" : ""}`}>
      <div className="modal-z-bg">
        <div className="modal-z-card">
          <button className="modal-z-close" onClick={onCancel}>
            <i className="ri-close-line"></i>
          </button>
          <div className="modal-z-title">
            <h6>{title}</h6>
          </div>
          <div className="modal-z-body">{children}</div>
          <div className="modal-z-footer">
            <button className="modal-z-primary-btn" onClick={onOk}>
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
