import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  categoria: String,
  imagen: String,
});

export default mongoose.models.Producto || mongoose.model("Producto", ProductoSchema);
