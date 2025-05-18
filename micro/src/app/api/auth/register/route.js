import { connectDB } from "@/lib/mongodb"; 
import Usuario from "@/models/Usuario";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const existe = await Usuario.findOne({ email: data.email });

  if (existe) {
    return Response.json({ ok: false, msg: "Correo ya registrado." }, { status: 400 });
  }

  const nuevo = new Usuario(data);
  await nuevo.save();

  return Response.json({ ok: true, msg: "Usuario registrado" });
}
