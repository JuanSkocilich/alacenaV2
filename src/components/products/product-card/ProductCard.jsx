"use client";

import React, { useState } from "react";
import "./ProductCard.css";
import Modal from "../../ui/Modal";
import { EditProductForm } from "../EditProductForm";
import { useProduct } from "@/context/ProductContext";
import { toast } from "sonner";
import { HiOutlineTrash } from "react-icons/hi";
import { ModalDeleteProduct } from "./ModalDeleteProduct";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

export const ProductCard = ({ product }) => {
  const { editProduct } = useProduct();

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleEditProduct = () => {
    setIsOpenEdit(true);
  };

  const handleDeleteProduct = () => {
    setIsOpenDelete(true);
  };

  const handleIncreaseProduct = async () => {
    await editProduct(product.id, {
      amount: product.amount + 1,
    });
  };

  const handleDecreaseProduct = async () => {
    if (product.amount > 0) {
      await editProduct(product.id, {
        amount: product.amount - 1,
      });
    } else {
      toast.error("La cantidad no puede ser negativa");
    }
  };

  return (
    <div className="product-card">
      <Modal setIsOpen={setIsOpenEdit} open={isOpenEdit} close={() => setIsOpenEdit(false)}>
        <EditProductForm product={product} setIsOpen={setIsOpenEdit} />
      </Modal>
      <Modal setIsOpen={setIsOpenDelete} open={isOpenDelete} close={() => setIsOpenDelete(false)}>
        <ModalDeleteProduct product={product} setIsOpenDelete={setIsOpenDelete} />
      </Modal>
      <p className="product-title">{product.name}</p>
      <div className="products-buttons">
        <button onClick={handleDecreaseProduct}>
          <AiOutlineMinus size={15} />
        </button>
        <p>{product.amount}</p>
        <button onClick={handleIncreaseProduct}>
          <AiOutlinePlus size={15} />
        </button>
      </div>
      <div>
        <button className="product-edit" onClick={handleEditProduct}>
          <CiEdit size={20} /> Editar
        </button>
        <button className="product-delete" onClick={handleDeleteProduct}>
          <HiOutlineTrash size={20} />
        </button>
      </div>
      <div className="expires-in">
        <p>{!product.text ? "Expira en:" : "Vencido en"}</p>
        <span>{product.date.split("-").reverse().join("/")}</span>
      </div>
      <div className="product-to-expire">
        {product.days && !product.text && (
          <p>
            {product.days == 1 ? "Falta" : "Faltan"} {product.days}{" "}
            {product.days == 1 ? "dia" : "dias"} para vencer
          </p>
        )}
        {product.text && (
          <p>
            {product.text} {product.days} {product.days == 1 ? "dia" : "dias"}
          </p>
        )}
      </div>
      <div className="product-category">
        <p>{product.category}</p>
      </div>
    </div>
  );
};
