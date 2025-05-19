import { connectDB } from "../../../lib/mongodb";
import Usuario from "../../../models/Usuario";
import { cookies } from "next/headers";

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  const user = await Usuario.findOne({ email: data.email, password: data.password });
  if (!user) {
    return Response.json({ ok: false, msg: "Correo o contraseña incorrectos." }, { status: 401 });
  }

  // Guardar ID de usuario en cookie
  cookies().set("user_id", user._id.toString(), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 // 1 día
  });

  return Response.json({ ok: true, user: { nombre: user.nombre, email: user.email } });
}