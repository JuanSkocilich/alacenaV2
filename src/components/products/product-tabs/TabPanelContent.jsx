import React from "react";
import { ProductsPagination } from "../ProductsPagination";
import { NoProducts } from "./NoProducts";
import "./TabPanelContent.css";

export const TabPanelContent = ({ productsArray, text, title }) => {
  return (
    <div className="container-type-product">
      {productsArray.length === 0 ? (
        <NoProducts text={text} />
      ) : (
        <>
          <p className="title-panel">{title}</p>
          <ProductsPagination productArray={productsArray} />
        </>
      )}
    </div>
  );
};
