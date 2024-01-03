"use client";

import { useCategory } from "@/context/CategoryContext";
import { useProduct } from "@/context/ProductContext";
import React from "react";

export const ProductsFilters = () => {
  const { allCategories } = useCategory();
  const { setCategoryFilter, allProducts, allProductsCategory } = useProduct();

  const handleSetCategory = (category) => {
    setCategoryFilter(category);
  };

  return (
    <div>
      <>
        <button onClick={() => handleSetCategory("all")}>Todos</button>
        {Array.from(new Set(allProductsCategory.map(({ category }) => category))).map(
          (selectCategory) => {
            return (
              <button key={selectCategory} onClick={() => handleSetCategory(selectCategory)}>
                {selectCategory !== "" ? (
                  selectCategory
                ) : (
                  <span>
                    <span style={{ display: "none" }}>zzzz</span>sin categoria
                  </span>
                )}
                <span>
                  {
                    allProductsCategory.filter((category) => category.category === selectCategory)
                      .length
                  }
                </span>
              </button>
            );
          }
        )}
      </>
    </div>
  );
};
