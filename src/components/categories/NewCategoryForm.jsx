"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategory } from "@/context/CategoryContext";
import { categoryNameSchema } from "@/utils/yupSchemas";
import "../products/ProductForm.css";

const RegisterSchema = yup.object().shape({
  category: categoryNameSchema,
});

export const NewCategoryForm = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const { createCategory } = useCategory();

  const onSubmit = handleSubmit(async ({ category }) => {
    await createCategory(category);
    setIsOpen(false);
  });

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h1>Agregar categoria</h1>

        <label htmlFor="category">Nombre:</label>
        <input
          className="input-product"
          id="category"
          type="text"
          {...register("category")}
          placeholder="Nombre de categoria"
        />
        {errors.category && <span style={{ color: "red" }}>{errors.category.message}</span>}

        <button className="button-product">Agregar categoria</button>
      </form>
    </div>
  );
};
