"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CategoryContext = createContext();

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
};

export function CategoryProvider({ children }) {
  const [allCategories, setAllCategories] = useState([]);

  const [selectCategories, setSelectCategories] = useState([]);

  const [changeCategory, setChangeCategory] = useState(false);

  const getAllCategories = async () => {
    try {
      const res = await fetch("/api/category");
    const resJSON = await res.json();

    const selecCategoryArray = [{ value: "", label: "Sin categoria" }];
    resJSON.forEach((cat) => {
      selecCategoryArray.push({
        value: cat.category,
        label: cat.category,
      });
    });
    const orderByName = selecCategoryArray.sort(function (a, b) {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
    setSelectCategories(orderByName);

    setAllCategories(resJSON);
    } catch (error) {
      console.log(error)
    }
  };

  const createCategory = async (category) => {
    const res = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({
        category,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const resJSON = await res.json();
    if (res.ok) {
      setChangeCategory(true);
      toast.success(`Categoria creada con exito`);
    } else {
      toast.error(resJSON.message || messages.error.default);
    }
  };

  const editCategory = async (id, category, oldCategory) => {
    const res = await fetch(`/api/category/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        category,
        oldCategory,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const resJSON = await res.json();

    if (res.ok) {
      setChangeCategory(true);
      toast.success("Categoria editada con exito");
    } else {
      toast.error(resJSON.message || messages.error.default);
    }
  };

  const deleteCategory = async (id, oldCategory) => {
    const res = await fetch(`/api/category/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        oldCategory,
      }),
    });

    const resJSON = await res.json();

    if (res.ok) {
      setChangeCategory(true);
      toast.success(`category eliminado con exito`);
    } else {
      toast.error(resJSON.message || messages.error.default);
    }
  };

  useEffect(() => {
    setChangeCategory(false);
    getAllCategories();
  }, [changeCategory]);

  return (
    <CategoryContext.Provider
      value={{
        // Get all categories
        getAllCategories,
        allCategories,
        selectCategories,

        // Create category
        createCategory,

        // Edit category
        editCategory,

        // Delete category
        deleteCategory,

        changeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
