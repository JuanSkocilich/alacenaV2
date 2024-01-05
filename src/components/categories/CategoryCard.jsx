"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import { EditCategoryForm } from "./EditCategoryForm";
import { useCategory } from "@/context/CategoryContext";
import "./CategoryCard.css";

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
    <>
      <Modal setIsOpen={setIsOpen} open={isOpen} close={() => setIsOpen(false)}>
        <EditCategoryForm category={category} setIsOpen={setIsOpen} />
      </Modal>
      <div className="card-category-container">
        <p className="category-title">{category.category}</p>
        {/* <p>{category.folder}</p> */}
        <div className="card-buttons">
          <button className="card-button" onClick={handleEditCategory}>
            Editar
          </button>
          <button className="card-button" onClick={handleDeleteCategory}>
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};
