import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function GET(request, { params }) {
  const product = await db.product.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const data = await request.json();

  const productUpdated = await db.product.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });

  return NextResponse.json(productUpdated);
}

export async function DELETE(request, { params }) {
  try {
    const productRemoved = await db.product.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(productRemoved);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
