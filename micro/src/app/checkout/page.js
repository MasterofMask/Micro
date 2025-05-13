"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";

const CheckoutPage = () => {
  // Simulación de datos del usuario y carrito
  const usuario = {
    id: 1,
    direccion: "Calle Falsa 123, Ciudad, País",
  };

  const carrito = [
    { id: 1, nombre: "Producto 1", cantidad: 2, precio: 100 },
    { id: 2, nombre: "Producto 2", cantidad: 1, precio: 200 },
  ];

  // Calcular el total del carrito
  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log("Datos del formulario de pago:", data);
    // Aquí puedes manejar la lógica para enviar los datos al servidor
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
              {carrito.map((p) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={p.id}
                >
                  <div>
                    <strong>{p.nombre}</strong>
                    <br />
                    <small>Cantidad: {p.cantidad}</small>
                  </div>
                  <span>${p.precio * p.cantidad}</span>
                </li>
              ))}
            </ul>
            <div className="card-footer text-end">
              <strong>Total: ${total}</strong>
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
                    defaultValue={usuario.direccion}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Método de pago</label>
                  <select name="metodo_pago" className="form-select" required>
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