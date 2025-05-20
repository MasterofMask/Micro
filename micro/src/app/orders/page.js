"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";

const OrdersPage = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const data = await res.json();
        if (data.ok) {
          setPedidos(data.pedidos);
        }
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
      }
    };

    cargarPedidos();
  }, []);

  // Inicializa Bootstrap (opcional para el acordeón)
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Tus Pedidos</title>
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
              {pedidos.map((pedido, index) => (
                <div className="accordion-item" key={pedido._id}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      Pedido #{pedido._id.slice(-6).toUpperCase()} -{" "}
                      {new Date(pedido.fecha).toLocaleDateString()} -{" "}
                      {pedido.metodo_pago}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionPedidos"
                  >
                    <div className="accordion-body text-start">
                      <p>
                        <strong>Dirección de envío:</strong> {pedido.direccion}
                      </p>
                      <p>
                        <strong>Método de pago:</strong> {pedido.metodo_pago}
                      </p>
                      <p>
                        <strong>Total:</strong> ${pedido.total.toFixed(2)}
                      </p>

                      <h5 className="mt-3">Productos:</h5>
                      <ul className="list-group">
                        {pedido.productos.map((prod, i) => (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={i}
                          >
                            {prod.nombre} x{prod.cantidad}
                            <span className="badge bg-primary rounded-pill">
                              ${Number(prod.precio * prod.cantidad).toFixed(2)}
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
