"use client";

import { useCategory } from "@/context/CategoryContext";
import React, { useEffect } from "react";
import { CategoryCard } from "./CategoryCard";

export const RenderCategory = () => {
  const { getAllCategories, allCategories } = useCategory();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: 'wrap', gap: 10 }}>
      {allCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
