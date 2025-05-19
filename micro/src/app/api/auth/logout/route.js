import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    
    // Eliminar la cookie de user_id estableciendo su valor a una cadena vacía
    // y con un maxAge negativo para eliminarla inmediatamente
    cookieStore.set('user_id', '', {
      httpOnly: true,
      path: '/',
      maxAge: -1, // Esto hace que la cookie sea eliminada inmediatamente
      sameSite: 'strict'
    });
    
    return NextResponse.json({ 
      ok: true, 
      msg: "Sesión cerrada correctamente",
      redirectTo: '/' // Redirección a la página principal
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return NextResponse.json({ 
      ok: false, 
      msg: "Error al cerrar sesión" 
    }, { status: 500 });
  }
}