import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
  userId: String,
  productos: [
    {
      productoId: String,
      nombre: String,
      precio: Number,
      cantidad: Number,
    },
  ],
  direccion: String,
  metodo_pago: String,
  total: Number,
  fecha: { type: Date, default: Date.now },
});

export default mongoose.models.Pedido || mongoose.model("Pedido", PedidoSchema);
