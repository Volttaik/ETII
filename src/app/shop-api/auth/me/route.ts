import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ user: null });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ user: null });

  const db = getDb();
  const user = db.prepare("SELECT id, fullName, email, phone FROM users WHERE id = ?").get(payload.userId);
  return NextResponse.json({ user });
}
