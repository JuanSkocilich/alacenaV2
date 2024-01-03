"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import { NewCategoryForm } from "./NewCategoryForm";

export const NewCategory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Agregar categoria</button>
      <Modal setIsOpen={setIsOpen} open={isOpen} close={() => setIsOpen(false)}>
        <NewCategoryForm setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};
