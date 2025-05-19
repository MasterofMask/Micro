import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Usuario from "../../../../models/Usuario";

export async function GET() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const userId = cookieStore.get("user_id")?.value;
    
    if (!userId) {
      return NextResponse.json({ isAuthenticated: false });
    }
    
    // Opcionalmente, verificar que el usuario existe en la base de datos
    await connectDB();
    const usuario = await Usuario.findById(userId);
    
    if (!usuario) {
      return NextResponse.json({ isAuthenticated: false });
    }
    
    // Devolver información mínima del usuario
    return NextResponse.json({ 
      isAuthenticated: true,
      user: {
        _id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre
        // Otros campos que quieras devolver
      }
    });
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}