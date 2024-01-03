import React from "react";
import { ProductsPagination } from "../ProductsPagination";
import { NoProducts } from "./NoProducts";

export const TabPanelContent = ({ productsArray, text }) => {
  return (
    <div className="container-type-product">
      {productsArray.length === 0 ? (
        <NoProducts text={text} />
      ) : (
        <>
          <h2>Todos los productos</h2>
          <ProductsPagination productArray={productsArray} />
        </>
      )}
    </div>
  );
};
