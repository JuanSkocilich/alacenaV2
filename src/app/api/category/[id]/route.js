import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request, { params }) {
  const category = await db.category.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(category);
}

export async function PUT(request, { params }) {
  try {
    const { category, oldCategory } = await request.json();

    const categoryFound = await db.category.findUnique({ where: { category: category } });

    if (categoryFound) {
      return NextResponse.json({ message: "Categoria ya creada" }, { status: 400 });
    }

    const categoryUpdated = await db.category.update({
      where: {
        id: Number(params.id),
      },
      data: {
        category: category,
      },
    });

    const productUpdated = await db.product.updateMany({
      where: {
        category: oldCategory,
      },
      data: {
        category: category,
      },
    });

    return NextResponse.json(categoryUpdated);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { oldCategory } = await request.json();

    const categoryRemoved = await db.category.delete({
      where: {
        id: Number(params.id),
      },
    });

    const productUpdated = await db.product.updateMany({
      where: {
        category: oldCategory,
      },
      data: {
        category: '',
      },
    });

    return NextResponse.json(categoryRemoved);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
