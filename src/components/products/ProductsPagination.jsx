"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import ProductCard from "./product-card/ProductCard";
import "./ProductsPagination.css";
import { useSearchParams } from "next/navigation";

function Items({ currentItems }) {
  return (
    <>
      <div className="container-products">
        {currentItems.length
          ? currentItems.map((product) => <ProductCard key={product.id} product={product} />)
          : "No hay resultados similares"}
      </div>
    </>
  );
}

export const ProductsPagination = ({ productArray }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const elementsPerPage = 12;

  const searchParams = useSearchParams();
  const getSearch = searchParams.get("search")?.toString() || "";

  const endOffset = itemOffset + elementsPerPage;
  const currentItems = productArray.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productArray.length / elementsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * elementsPerPage) % productArray.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemOffset(0);
  }, [getSearch]);

  return (
    <>
      <div className="container-pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <button className="button-pagination">
              <GrNext />
            </button>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={
            <button className="button-pagination">
              <GrPrevious />
            </button>
          }
          renderOnZeroPageCount={null}
          className="page"
          activeClassName="active-page"
          pageClassName="page-item"
        />
      </div>
      <Items currentItems={currentItems} />
    </>
  );
};
