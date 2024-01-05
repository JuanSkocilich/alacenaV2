"use client";

import React, { useEffect, useState } from "react";
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

export const EditProductForm = ({ product, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const { editProduct } = useProduct();

  const { getAllCategories, selectCategories } = useCategory();

  const productsValues = {
    name: product.name,
    amount: product.amount,
    date: product.date,
    category: product.category,
  };

  const [values, setValues] = useState(productsValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = handleSubmit(async ({ name, amount, date, category }) => {
    const dataValues = {
      name,
      amount,
      date,
      category: category.value,
    };
    await editProduct(product.id, dataValues);
    setIsOpen(false);
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label htmlFor="name">Nombre:</label>
        <input
          className="input-product"
          id="name"
          type="text"
          placeholder="Nombre del producto"
          {...register("name")}
          onChange={handleInputChange}
          value={values.name}
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}

        <label htmlFor="amount">Cantidad</label>
        <input
          className="input-product"
          min={0}
          id="amount"
          type="number"
          placeholder="Cantidad del producto"
          {...register("amount")}
          onChange={handleInputChange}
          value={values.amount}
        />
        {errors.amount && <span style={{ color: "red" }}>{errors.amount.message}</span>}

        <label htmlFor="date">Fecha de vencimento:</label>
        <input
          className="input-product"
          id="date"
          type="date"
          {...register("date")}
          onChange={handleInputChange}
          value={values.date}
        />
        {errors.date && <span style={{ color: "red" }}>{errors.date.message}</span>}

        <label htmlFor="category">Categoria:</label>
        <Controller
          name="category"
          defaultValue={() => selectCategories.filter((cat) => cat.value === values.category)}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Elegir categoria"
              noOptionsMessage={({ inputValue }) => `No existe la categoria "${inputValue}"`}
              defaultValue={() => selectCategories.filter((cat) => cat.value === values.category)}
              options={selectCategories}
            />
          )}
          control={control}
        />

        <button className="button-product" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
