"use client";

import { useProduct } from "@/context/ProductContext";
import React from "react";

import "./ModalDeleteProduct.css";

export const ModalDeleteProduct = ({ product, setIsOpenDelete }) => {
  const { deleteProduct } = useProduct();

  const handleAcceptDelete = async () => {
    await deleteProduct(product.id);
    setIsOpenDelete(false);
  };

  return (
    <div className="container-modal-delete-product">
      <p>
        Estas seguro que quieres eliminar <b>"{product.name}"</b>
      </p>
      <div className="container-modal-delete-buttons">
        <button onClick={() => setIsOpenDelete(false)}>Cancelar</button>
        <button onClick={handleAcceptDelete}>Aceptar</button>
      </div>
    </div>
  );
};
