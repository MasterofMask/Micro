import { connectDB } from "../../lib/mongodb";
import Carrito from "../../models/Carrito";
import Producto from "../../models/Producto";
import { cookies } from "next/headers";

// POST: Agregar al carrito
export async function POST(req) {
  await connectDB();
  const userId = cookies().get("user_id")?.value;
  const { productoId, nombre, precio, cantidad } = await req.json();

  if (!userId) {
    return Response.json({ ok: false, msg: "No autenticado" }, { status: 401 });
  }

  let carrito = await Carrito.findOne({ userId });
  if (!carrito) carrito = new Carrito({ userId, productos: [] });

  const index = carrito.productos.findIndex(p => p.productoId === productoId);
  if (index >= 0) {
    carrito.productos[index].cantidad += cantidad;
  } else {
    carrito.productos.push({ productoId, nombre, precio, cantidad });
  }

  await carrito.save();
  return Response.json({ ok: true, carrito });
}

// GET: Obtener el carrito
export async function GET() {
  await connectDB();
  const userId = cookies().get("user_id")?.value;
  if (!userId) {
    return Response.json({ ok: false, msg: "No autenticado" }, { status: 401 });
  }

  const carrito = await Carrito.findOne({ userId });
  return Response.json({ ok: true, carrito: carrito || { productos: [] } });
}

// PUT: Actualizar cantidad
export async function PUT(req) {
  await connectDB();
  const userId = cookies().get("user_id")?.value;
  const { productoId, cantidad } = await req.json();

  const carrito = await Carrito.findOne({ userId });
  if (!carrito) return Response.json({ ok: false, msg: "Carrito no encontrado" });

  const index = carrito.productos.findIndex(p => p.productoId === productoId);
  if (index >= 0) {
    carrito.productos[index].cantidad = cantidad;
  }

  await carrito.save();
  return Response.json({ ok: true, carrito });
}

// DELETE: Eliminar producto
export async function DELETE(req) {
  await connectDB();
  const userId = cookies().get("user_id")?.value;
  const { productoId } = await req.json();

  const carrito = await Carrito.findOne({ userId });
  if (!carrito) return Response.json({ ok: false, msg: "Carrito no encontrado" });

  carrito.productos = carrito.productos.filter(p => p.productoId !== productoId);
  await carrito.save();
  return Response.json({ ok: true, carrito });
}
