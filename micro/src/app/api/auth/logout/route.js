import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    msg: "Sesión cerrada correctamente",
    redirectTo: "/",
  });

  // ✅ Elimina la cookie estableciendo maxAge en 0
  response.cookies.set("user_id", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  });

  return response;
}