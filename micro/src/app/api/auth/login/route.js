import { connectDB } from "../../../lib/mongodb";
import Usuario from "../../../models/Usuario";

import { NextResponse } from "next/server";

export async function POST(req) {
  const { cookies } = await import("next/headers"); // dicen que esto arregla
  const body = await req.json();
  await connectDB();

  const usuario = await Usuario.findOne({ email: body.email });

  if (!usuario || usuario.password !== body.password) {
    return NextResponse.json({ ok: false, msg: "Credenciales incorrectas" });
  }

  const cookieStore = await cookies(); //  await aquí
  cookieStore.set('user_id', usuario._id.toString(), {
  httponly: true,
  path: "/",
  maxAge: 60 * 60 * 24 // 1 día
  });

  return NextResponse.json({ ok: true, user: usuario });
}