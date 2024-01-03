"use client";

import React from "react";
import { RxCross1 } from "react-icons/rx";
import "./Modal.css";

export default function Modal({ children, open, close, setIsOpen }) {
  if (!open) return null;

  const handleClick = () => {
    setIsOpen(close);
  };

  return (
    <>
      <div className="div-overlay-style" />
      <div className="div-modal-style">
        <div>
          <button className="close-modal" onClick={handleClick}>
            <RxCross1 />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
