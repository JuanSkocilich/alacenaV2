import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function GET() {
  const categories = await db.category.findMany();

  return NextResponse.json(categories);
}

export async function POST(request) {
  try {
    const { category } = await request.json();

    const categoryFound = await db.category.findUnique({ where: { category: category } });

    if (categoryFound) {
      return NextResponse.json({ message: "Categoria ya creada" }, { status: 400 });
    }

    const newCategory = await db.category.create({
      data: {
        category,
        folder,
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
