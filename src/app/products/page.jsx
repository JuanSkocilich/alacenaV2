import { NewProduct } from "@/components/products/NewProduct";
import { ProductsFilters } from "@/components/products/ProductsFilters";
import { ProductsTabs } from "@/components/products/product-tabs/ProductsTabs";
import { SearchProduct } from "@/components/products/SearchProduct";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Mis productos",
  description: "Mis productos",
};

function ProductsPage() {
  return (
    <div>
      <Link href="/categories">Administrar categorias</Link>
      <SearchProduct />
      <NewProduct />
      <ProductsFilters />
      <ProductsTabs />
    </div>
  );
}

export default ProductsPage;
