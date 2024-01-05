"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategory } from "@/context/CategoryContext";
import "../products/ProductForm.css";

const RegisterSchema = yup.object().shape({
  category: yup.string().required("Requerido").trim(),
});

export const EditCategoryForm = ({ category: currentCategory, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const { editCategory } = useCategory();

  const CategoryValues = {
    category: currentCategory.category,
  };

  const [values, setValues] = useState(CategoryValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = handleSubmit(async ({ category }) => {
    await editCategory(currentCategory.id, category, currentCategory.category);
    setIsOpen(false);
  });

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h1>Editar categoria</h1>

        <label htmlFor="category">Nombre:</label>
        <input
          className="input-product"
          id="category"
          type="text"
          {...register("category")}
          onChange={handleInputChange}
          placeholder="Nombre de categoria"
          value={values.category}
        />
        {errors.category && <span style={{ color: "red" }}>{errors.category.message}</span>}

        <button className="button-product">Editar</button>
      </form>
    </div>
  );
};
