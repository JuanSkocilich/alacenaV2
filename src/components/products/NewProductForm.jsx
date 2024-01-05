"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProduct } from "@/context/ProductContext";
import { useCategory } from "@/context/CategoryContext";
import Select from "react-select";
import { productAmountSchema, productDateSchema, productNameSchema } from "@/utils/yupSchemas";
import "./ProductForm.css";

const RegisterSchema = yup.object().shape({
  name: productNameSchema,
  amount: productAmountSchema,
  date: productDateSchema,
});

export const NewProductForm = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const { createProduct } = useProduct();

  const { getAllCategories, selectCategories } = useCategory();

  const onSubmit = handleSubmit(async ({ name, amount, date, category }) => {
    await createProduct(name, amount, date, category.value);
    setIsOpen(false);
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h1>Agregar producto</h1>

        <label htmlFor="name">Nombre:</label>
        <input
          className="input-product"
          id="name"
          type="text"
          {...register("name")}
          placeholder="Nombre del producto"
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}

        <label htmlFor="amount">Cantidad:</label>
        <input
          className="input-product"
          min={0}
          id="amount"
          type="number"
          {...register("amount")}
          placeholder="Cantidad del producto"
        />
        {errors.amount && <span style={{ color: "red" }}>{errors.amount.message}</span>}

        <label htmlFor="date">Fecha de vencimento:</label>
        <input className="input-product" id="date" type="date" {...register("date")} />
        {errors.date && <span style={{ color: "red" }}>{errors.date.message}</span>}

        <label htmlFor="category">Categoria:</label>
        <Controller
          name="category"
          defaultValue={selectCategories[0]}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Elegir categoria"
              noOptionsMessage={({ inputValue }, options) => {
                return `No existe la categoria "${inputValue}"`;
              }}
              defaultValue={selectCategories[0]}
              options={selectCategories}
            />
          )}
          control={control}
        />

        <button className="button-product">Agregar producto</button>
      </form>
    </div>
  );
};
