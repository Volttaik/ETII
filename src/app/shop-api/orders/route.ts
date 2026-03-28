import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { customerName, customerEmail, customerPhone, deliveryAddress, city, state, items, total, paystackRef } =
      await req.json();

    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const authToken = req.cookies.get("auth_token")?.value;
    let userId: number | null = null;
    if (authToken) {
      const payload = verifyToken(authToken);
      if (payload) userId = payload.userId;
    }

    const db = getDb();
    const orderResult = db.prepare(
      `INSERT INTO orders (userId, customerName, customerEmail, customerPhone, deliveryAddress, city, state, total, paystackRef, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid')`
    ).run(userId, customerName, customerEmail, customerPhone, deliveryAddress, city || "", state || "", total, paystackRef || "");

    const orderId = orderResult.lastInsertRowid;
    const insertItem = db.prepare(
      "INSERT INTO order_items (orderId, productId, productName, quantity, price) VALUES (?, ?, ?, ?, ?)"
    );
    const insertItems = db.transaction((items: Array<{ productId: number; productName: string; quantity: number; price: number }>) => {
      for (const item of items) {
        insertItem.run(orderId, item.productId, item.productName, item.quantity, item.price);
      }
    });
    insertItems(items);

    return NextResponse.json({ orderId }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get("admin_token")?.value;
    if (adminToken !== "etii_admin_session_2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const orders = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC").all() as Array<Record<string, unknown>>;
    const ordersWithItems = orders.map((order) => {
      const items = db.prepare("SELECT * FROM order_items WHERE orderId = ?").all(order.id);
      return { ...order, items };
    });
    return NextResponse.json({ orders: ordersWithItems });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
