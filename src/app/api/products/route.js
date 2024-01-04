import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function GET() {
  try {
    const products = await db.product.findMany({ orderBy: { name: "asc" } });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
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
