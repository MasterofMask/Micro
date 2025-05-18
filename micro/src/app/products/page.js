import { connectDB } from "../lib/mongodb";
import Producto from "../models/Producto";
import Navbar from "../components/navbar";
import ListaProductos from "../components/ListaProductos";

export default async function ProductsPage() {
  await connectDB();
  const productos = await Producto.find({}).lean();

  const productosLimpios = productos.map(p => ({
    ...p,
    _id: p._id.toString()
  }));

  return (
    <>
      <Navbar />
      <div className="container mt-5 bg-white rounded shadow p-4">
        <h2 className="mb-4 text-center">Catálogo de Productos</h2>
        <ListaProductos productos={productosLimpios} />
      </div>
    </>
  );
}
