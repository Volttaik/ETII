import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminToken = req.cookies.get("admin_token")?.value;
    if (adminToken !== "etii_admin_session_2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { name, price, description, discount, image, category } = await req.json();

    const db = getDb();
    db.prepare(
      "UPDATE products SET name=?, price=?, description=?, discount=?, image=?, category=? WHERE id=?"
    ).run(name, Number(price) * 100, description || "", Number(discount) || 0, image || "", category || "General", Number(id));

    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id));
    return NextResponse.json({ product });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminToken = req.cookies.get("admin_token")?.value;
    if (adminToken !== "etii_admin_session_2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const db = getDb();
    db.prepare("DELETE FROM products WHERE id = ?").run(Number(id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
