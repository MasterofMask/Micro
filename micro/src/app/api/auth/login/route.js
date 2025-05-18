import { connectDB } from "../lib/mongodb";
import Usuario from "../models/Usuario";

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  const user = await Usuario.findOne({ email: data.email, password: data.password });
  if (!user) {
    return Response.json({ ok: false, msg: "Correo o contraseña incorrectos." }, { status: 401 });
  }

  return Response.json({ ok: true, user });
}
