import { connectDB } from "../../../lib/mongodb";
import Producto from "../../../models/Producto";

export async function GET() {
  await connectDB();
  const productos = await Producto.find({});
  return Response.json(productos);
}
