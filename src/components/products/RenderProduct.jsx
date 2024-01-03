"use client";

import React, { Suspense, lazy } from "react";
const ProductCard = lazy(() => import("./product-card/ProductCard"));
import "./RenderProduct.css";

export const RenderProduct = ({ products }) => {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <div className="container-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Suspense>
  );
};
