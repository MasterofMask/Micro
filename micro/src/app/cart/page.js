"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

const CartPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        const data = await res.json();
        if (data.ok) {
          setCarrito(data.carrito.productos);
        }
      } catch (err) {
        console.error("Error al cargar el carrito:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarCarrito();
  }, []);

  const handleUpdateQuantity = async (e, productoId) => {
    e.preventDefault();
    const nuevaCantidad = parseInt(new FormData(e.target).get("cantidad"), 10);

    const res = await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productoId, cantidad: nuevaCantidad }),
    });

    const data = await res.json();
    if (data.ok) {
      setCarrito(data.carrito.productos); // actualiza carrito completo
    }
  };

  const handleRemoveProduct = async (productoId) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productoId }),
    });

    const data = await res.json();
    if (data.ok) {
      setCarrito(data.carrito.productos);
    }
  };

  const totalCarrito = carrito.reduce(
    (total, p) => total + p.precio * p.cantidad,
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mt-5 bg-white p-4">
        <h2 className="mb-5">
          <i className="bi bi-cart-check"></i> Carrito de Compras
        </h2>

        {loading ? (
          <p>Cargando carrito...</p>
        ) : carrito.length === 0 ? (
          <div className="alert alert-info text-center">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            <div className="row g-4">
              {carrito.map((p) => (
                <div className="col-md-6 col-lg-4" key={p.productoId}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.nombre}</h5>
                      <p className="card-text">
                        Precio: <strong>${p.precio}</strong>
                      </p>
                      <p className="card-text">
                        Cantidad actual: <strong>{p.cantidad}</strong>
                      </p>
                      <p className="card-text">
                        Total: <strong>${p.precio * p.cantidad}</strong>
                      </p>

                      {/* Actualizar cantidad */}
                      <form
                        onSubmit={(e) => handleUpdateQuantity(e, p.productoId)}
                        className="mt-auto"
                      >
                        <div className="input-group mb-2">
                          <input
                            type="number"
                            name="cantidad"
                            defaultValue={p.cantidad}
                            min="1"
                            className="form-control form-control-sm"
                          />
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                          >
                            Actualizar
                          </button>
                        </div>
                      </form>

                      {/* Eliminar producto */}
                      <button
                        onClick={() => handleRemoveProduct(p.productoId)}
                        className="btn btn-danger btn-sm w-100"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <p className="fw-bold">Total del carrito: ${totalCarrito}</p>
              <button className="btn btn-success btn-lg" type="button" onClick={() => window.location.href = "/checkout"}>
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
