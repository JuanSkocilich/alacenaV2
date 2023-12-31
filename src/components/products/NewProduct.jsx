"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import { NewProductForm } from "./NewProductForm";
import { MdOutlineAdd } from "react-icons/md";
import "./NewProduct.css";

export const NewProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="button-new-category" onClick={() => setIsOpen(true)}>
        <MdOutlineAdd /> Agregar Producto
      </button>
      <Modal setIsOpen={setIsOpen} open={isOpen} close={() => setIsOpen(false)}>
        <NewProductForm setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};
