"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import "./SearchProduct.css";

export const SearchProduct = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container-search">
      <input
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        placeholder="Buscar producto..."
        className="search-product"
      />
    </div>
  );
};
