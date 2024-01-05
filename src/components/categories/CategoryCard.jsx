"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import { EditCategoryForm } from "./EditCategoryForm";
import { useCategory } from "@/context/CategoryContext";

export const CategoryCard = ({ category }) => {
  const { deleteCategory } = useCategory();

  const [isOpen, setIsOpen] = useState(false);

  const handleEditCategory = () => {
    setIsOpen(true);
  };

  const handleDeleteCategory = () => {
    deleteCategory(category.id, category.category);
  };

  return (
    <div style={{ border: "1px solid" }}>
      <Modal setIsOpen={setIsOpen} open={isOpen} close={() => setIsOpen(false)}>
        <EditCategoryForm category={category} setIsOpen={setIsOpen} />
      </Modal>
      <p>{category.category}</p>
      <p>{category.folder}</p>
      <button onClick={handleEditCategory}>Editar</button>
      <button onClick={handleDeleteCategory}>Eliminar</button>
    </div>
  );
};
