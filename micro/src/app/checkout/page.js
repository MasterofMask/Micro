"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const CheckoutPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [direccion, setDireccion] = useState("Calle Falsa 123, Ciudad, País");
  const [metodoPago, setMetodoPago] = useState("");

  // Cargar el carrito real
  useEffect(() => {
    const cargarCarrito = async () => {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();
      if (data.ok) {
        setCarrito(data.carrito.productos);
        const totalCalculado = data.carrito.productos.reduce(
          (acc, p) => acc + p.precio * p.cantidad,
          0
        );
        setTotal(totalCalculado);
      }
    };

    cargarCarrito();
  }, []);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direccion,
          metodo_pago: metodoPago,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        alert("✅ Pedido confirmado con éxito");
        window.location.href = "/orders";
      } else {
        alert("❌ Error: " + data.msg);
      }
    } catch (err) {
      console.error("Error al confirmar el pedido:", err);
      alert("❌ Error inesperado");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-light text-center text-dark py-5 mt-5">
        <div className="container mt-5 mb-5">
          <h2 className="mb-4 text-center">🧾 Finalizar Compra</h2>

          <div className="row g-4">
            {/* Resumen del carrito */}
            <div className="col-md-7">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  Resumen del Pedido
                </div>
                <ul className="list-group list-group-flush">
                  {carrito.map((p, i) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={i}
                    >
                      <div>
                        <strong>{p.nombre}</strong>
                        <br />
                        <small>Cantidad: {p.cantidad}</small>
                      </div>
                      <span>${(p.precio * p.cantidad).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="card-footer text-end">
                  <strong>Total: ${total.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Formulario de pago */}
            <div className="col-md-5">
              <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                  Información de Envío y Pago
                </div>
                <div className="card-body">
                  <form onSubmit={handleCheckoutSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Dirección de envío</label>
                      <input
                        type="text"
                        name="direccion_envio"
                        className="form-control"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Método de pago</label>
                      <select
                        name="metodo_pago"
                        className="form-select"
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="tarjeta">Tarjeta de crédito</option>
                        <option value="paypal">PayPal</option>
                        <option value="transferencia">Transferencia</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                      Confirmar y Pagar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
