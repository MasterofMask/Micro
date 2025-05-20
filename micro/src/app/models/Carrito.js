import mongoose from 'mongoose';

const CarritoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productos: [
    {
      productoId: { type: String, required: true },
      nombre: String,
      precio: Number,
      cantidad: Number,
    },
  ],
});

export default mongoose.models.Carrito || mongoose.model('Carrito', CarritoSchema);
