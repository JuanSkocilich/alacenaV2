"use client";

import { finalDate } from "@/utils/date";
import { searchCase } from "@/utils/search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCategory } from "./CategoryContext";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }

  return context;
};

export function ProductProvider({ children }) {
  const { changeCategory } = useCategory();

  const router = useRouter();

  const [allProducts, setAllProducts] = useState([]);
  const [productToExpire, setProductToExpire] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [missingProducts, setMissingProducts] = useState([]);

  const [allProductsCategory, setAllProductsCategory] = useState([]);

  const [changeProduct, setChangeProduct] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("all");

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getSearch = searchParams.get("search")?.toString() || "";

  // Get all products
  const getAllProducts = async () => {
    const res = await fetch("/api/products");
    const resJSON = await res.json();

    setAllProductsCategory(resJSON);

    const filter =
      categoryFilter !== "all"
        ? resJSON.filter((pro) => pro.category === categoryFilter || pro.category === "")
        : resJSON;

    const search =
      getSearch !== "" ? filter.filter(({ name }) => searchCase(name, getSearch)) : filter;

    const allProductArray = [];
    const productToExpireArray = [];
    const expiredProductsArray = [];
    const missingProductsArray = [];

    search.forEach((pro) => {
      allProductArray.push({ ...pro });

      if (pro.date && pro.amount > 0) {
        var day1 = new Date(finalDate);
        var day2 = new Date(pro.date);

        var difference = Math.abs(day2 - day1);
        var days = difference / (1000 * 3600 * 24);

        if (days < 10 && day2 > day1) {
          productToExpireArray.push({
            ...pro,
            days: Math.round(days),
          });
        } else if (day2 <= day1) {
          expiredProductsArray.push({
            ...pro,
            days: Math.round(days),
            text: "Vencido hace ",
          });
        }
      }

      if (pro.amount === 0) {
        missingProductsArray.push({ ...pro });
      }
    });
    setAllProducts(allProductArray);
    setProductToExpire(productToExpireArray);
    setExpiredProducts(expiredProductsArray);
    setMissingProducts(missingProductsArray);
  };

  // Create product
  const createProduct = async (name, amount, date, category) => {
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        amount,
        date,
        category,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const resJSON = await res.json();
    if (res.ok) {
      setChangeProduct(true);
      toast.success(`Producto creado con exito`);
    } else {
      toast.error(resJSON.message || messages.error.default);
    }
  };

  // Edit product
  const editProduct = async (id, data) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJSON = await res.json();

    if (res.ok) {
      setChangeProduct(true);
      toast.success("Producto editado con exito");
    } else {
      toast.error(resJSON.message || messages.error.default);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const resJSON = await res.json();

    if (res.ok) {
      setChangeProduct(true);
      toast.success(`Producto eliminado con exito`);
    } else {
      toast.error(resJSON.message || messages.error.default);
    }
  };

  useEffect(() => {
    getAllProducts();
    setChangeProduct(false);
  }, [getSearch, changeProduct, changeCategory, categoryFilter]);

  return (
    <ProductContext.Provider
      value={{
        // Get all products
        getAllProducts,
        allProducts,
        productToExpire,
        expiredProducts,
        missingProducts,

        // Create product
        createProduct,

        // Edit product
        editProduct,

        // Delete product
        deleteProduct,

        setCategoryFilter,
        allProductsCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
