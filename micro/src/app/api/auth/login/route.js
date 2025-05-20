import { connectDB } from "../../../lib/mongodb";
import Usuario from "../../../models/Usuario";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { cookies } = await import("next/headers");
    const body = await req.json();
    
    await connectDB();

    const usuario = await Usuario.findOne({ email: body.email });

    if (!usuario || usuario.password !== body.password) {
      return NextResponse.json({ 
        ok: false, 
        msg: "Credenciales incorrectas" 
      }, { status: 401 });
    }

    // Configura la cookie correctamente como awaited
    const cookieStore = await cookies();
    cookieStore.set('user_id', usuario._id.toString(), {
      httpOnly: true,  // Nota: httpOnly en camelCase
      path: "/",
      maxAge: 60 * 60 * 24, // 1 día
      sameSite: 'strict'
    });

    // Retorna datos del usuario sin incluir contraseña
    const userResponse = {
      _id: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
      // Incluye otros campos relevantes, pero no la contraseña
    };

    return NextResponse.json({ 
      ok: true, 
      user: userResponse,
      redirectTo: '/' // Indica la ruta a la que redirigir
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ 
      ok: false, 
      msg: "Error interno del servidor" 
    }, { status: 500 });
  }
}