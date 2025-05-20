import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fecha_registro: { type: Date, default: Date.now }
});

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);
