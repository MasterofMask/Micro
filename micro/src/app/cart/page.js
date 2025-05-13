"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";

const CartPage = () => {
  // Simulación de datos del carrito
  const [carrito, setCarrito] = useState([
    {
      id: 1,
      nombre: "Producto 1",
      precio: 100,
      cantidad: 2,
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 200,
      cantidad: 1,
    },
  ]);

  const handleUpdateQuantity = (e, productoId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevaCantidad = parseInt(formData.get("cantidad"), 10);

    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === productoId
          ? { ...producto, cantidad: nuevaCantidad }
          : producto
      )
    );
  };

  const handleRemoveProduct = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((producto) => producto.id !== productoId)
    );
  };

  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <>
    <Navbar />
    <div className="container mt-5 bg-white p-4">
    <div className="container mt-5">
      <h2 className="mb-5">
        <i className="bi bi-cart-check"></i> Carrito de Compras
      </h2>

      {carrito.length === 0 ? (
        <div className="alert alert-info text-center">
          Tu carrito está vacío.
        </div>
      ) : (
        <>
          <div className="row g-4">
            {carrito.map((p) => (
              <div className="col-md-6 col-lg-4" key={p.id}>
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
                      onSubmit={(e) => handleUpdateQuantity(e, p.id)}
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
                      onClick={() => handleRemoveProduct(p.id)}
                      className="btn btn-danger btn-sm w-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Proceder al pago */}
          <div className="text-center mt-4">
            <p className="fw-bold">Total del carrito: ${totalCarrito}</p>
            <button className="btn btn-success btn-lg" type="submit">
              Proceder al pago
            </button>
          </div>
        </>
      )}
    </div>
    </div>
    </>
  );
};

export default CartPage;