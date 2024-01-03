import { RenderCategory } from "@/components/categories/RenderCategory";
import React from "react";
import { NewCategory } from "@/components/categories/NewCategory";

export const metadata = {
  title: "Mis categorias",
  description: "Mis categorias",
};

function CategoriesPage() {
  return (
    <div>
      <NewCategory />
      <RenderCategory />
    </div>
  );
}

export default CategoriesPage;
