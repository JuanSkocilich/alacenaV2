import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <section>
      <div>
        <h1>Not found</h1>
        <Link href="/products">Volver</Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
