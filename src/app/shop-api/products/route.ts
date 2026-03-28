import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const products = db.prepare("SELECT * FROM products ORDER BY createdAt DESC").all();
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminToken = req.cookies.get("admin_token")?.value;
    if (adminToken !== "etii_admin_session_2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, price, description, discount, image, category } = await req.json();
    if (!name || !price) {
      return NextResponse.json({ error: "Name and price required" }, { status: 400 });
    }

    const db = getDb();
    const result = db.prepare(
      "INSERT INTO products (name, price, description, discount, image, category) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(name, Number(price) * 100, description || "", Number(discount) || 0, image || "", category || "General");

    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
