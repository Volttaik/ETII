import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const categories = db.prepare("SELECT * FROM categories ORDER BY createdAt ASC").all();
    return NextResponse.json({ categories });
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

    const { name, image } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const db = getDb();
    const result = db.prepare(
      "INSERT INTO categories (name, image) VALUES (?, ?)"
    ).run(name.trim(), image || "");

    const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(result.lastInsertRowid);
    return NextResponse.json({ category }, { status: 201 });
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE")) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
