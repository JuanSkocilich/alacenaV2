import React from "react";
import "./ProductsContainerPage.css";
import Link from "next/link";
import { SearchProduct } from "./SearchProduct";
import { NewProduct } from "./NewProduct";
import { ProductsFilters } from "./ProductsFilters";
import { ProductsTabs } from "./product-tabs/ProductsTabs";

export const ProductsContainerPage = () => {
  return (
    <div className="container-page-products">
      <Link href="/categories">Administrar categorias</Link>
      <SearchProduct />
      <NewProduct />
      <ProductsFilters />
      <ProductsTabs />
    </div>
  );
};
