import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function GET() {
  const products = await db.product.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const { name, amount, date, category } = await request.json();
    const newProduct = await db.product.create({
      data: {
        name,
        amount,
        date,
        category,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
  }
}
