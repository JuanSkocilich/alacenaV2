import * as yup from "yup";

export const productNameSchema = yup.string().required("El nombre es requerido").trim();

export const productAmountSchema = yup
  .number()
  .required("La cantidad es requerida")
  .typeError("La cantidad es requerida");

export const productDateSchema = yup.string().required("La fecha es requerida");

export const categoryNameSchema = yup
  .string()
  .required("El nombre es requerido")
  .trim()
  .matches(/^[a-z0-9 ]+$/, "No puede contener mayusculas");
