import { connectDB } from "../../lib/mongodb";
import Carrito from "../../models/Carrito";
import Pedido from "../../models/Pedido";
import { cookies } from "next/headers";

// POST: registrar pedido
export async function POST(req) {
  await connectDB();
  const userId = cookies().get("user_id")?.value;
  const { direccion, metodo_pago } = await req.json();

  if (!userId) return Response.json({ ok: false, msg: "No autenticado" }, { status: 401 });

  const carrito = await Carrito.findOne({ userId });
  if (!carrito || carrito.productos.length === 0)
    return Response.json({ ok: false, msg: "Carrito vacío" }, { status: 400 });

  const total = carrito.productos.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  const pedido = new Pedido({
    userId,
    productos: carrito.productos,
    direccion,
    metodo_pago,
    total,
    fecha: new Date(),
  });

  await pedido.save();

  carrito.productos = [];
  await carrito.save();

  return Response.json({ ok: true, msg: "Pedido registrado", pedidoId: pedido._id });
}

// ✅ GET: obtener pedidos del usuario
export async function GET() {
  await connectDB();
  const userId = cookies().get("user_id")?.value;

  if (!userId) {
    return Response.json({ ok: false, msg: "No autenticado" }, { status: 401 });
  }

  const pedidos = await Pedido.find({ userId }).sort({ fecha: -1 });

  return Response.json({ ok: true, pedidos });
}
