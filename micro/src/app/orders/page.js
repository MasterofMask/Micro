"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";

const OrdersPage = () => {
  // Simulación de datos de pedidos
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      fechaPedido: "2025-05-01",
      estado: "Enviado",
      direccionEnvio: "Calle Falsa 123, Ciudad, País",
      metodoPago: "Tarjeta de crédito",
      total: 500,
      productos: [
        { nombre: "Producto 1", cantidad: 2, precio: 100 },
        { nombre: "Producto 2", cantidad: 1, precio: 300 },
      ],
    },
    {
      id: 2,
      fechaPedido: "2025-04-25",
      estado: "Procesando",
      direccionEnvio: "Avenida Siempre Viva 742, Ciudad, País",
      metodoPago: "PayPal",
      total: 200,
      productos: [
        { nombre: "Producto 3", cantidad: 1, precio: 200 },
      ],
    },
  ]);

  // Inicializa Bootstrap (opcional)
  useEffect(() => {
    if (typeof window !== "undefined" && window.bootstrap) {
      window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Tus Pedidos</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </Head>

      <Navbar />
    <div className="bg-light text-center text-dark py-5 mt-5">
      <div className="container mt-5">
        <h2 className="text-center mb-4">📦 Tus Pedidos</h2>

        {pedidos.length === 0 ? (
          <div className="alert alert-info text-center">
            No tienes pedidos registrados.
          </div>
        ) : (
          <div className="accordion" id="accordionPedidos">
            {pedidos.map((pedido) => (
              <div className="accordion-item" key={pedido.id}>
                <h2 className="accordion-header" id={`heading${pedido.id}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${pedido.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${pedido.id}`}
                  >
                    Pedido #{pedido.id} - {pedido.fechaPedido} - {pedido.estado}
                  </button>
                </h2>
                <div
                  id={`collapse${pedido.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${pedido.id}`}
                  data-bs-parent="#accordionPedidos"
                >
                  <div className="accordion-body">
                    <p>
                      <strong>Dirección de envío:</strong> {pedido.direccionEnvio}
                    </p>
                    <p>
                      <strong>Método de pago:</strong> {pedido.metodoPago}
                    </p>
                    <p>
                      <strong>Total:</strong> ${pedido.total}
                    </p>

                    <h5 className="mt-3">Productos:</h5>
                    <ul className="list-group">
                      {pedido.productos.map((prod, index) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={index}
                        >
                          {prod.nombre} x{prod.cantidad}
                          <span className="badge bg-primary rounded-pill">
                            ${prod.precio * prod.cantidad}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default OrdersPage;