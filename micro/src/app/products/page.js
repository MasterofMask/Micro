"use client";

import React from "react";
import Navbar from "../components/navbar";

const ProductsPage = () => {
  // Simulación de datos de productos
  const productos = [
    {
      id: 1,
      nombre: "Producto 1",
      descripcion: "Descripción del producto 1",
      precio: 100,
      stock: 10,
      imagen: "https://via.placeholder.com/300x200?text=Producto+1",
    },
    {
      id: 2,
      nombre: "Producto 2",
      descripcion: "Descripción del producto 2",
      precio: 200,
      stock: 5,
      imagen: null, // Sin imagen
    },
    {
      id: 3,
      nombre: "Producto 3",
      descripcion: "Descripción del producto 3",
      precio: 300,
      stock: 8,
      imagen: "https://via.placeholder.com/300x200?text=Producto+3",
    },
  ];

  const handleAddToCart = (e, productoId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log("Producto agregado al carrito:", { productoId, ...data });
    // Aquí puedes manejar la lógica para agregar al carrito
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 bg-white rounded shadow p-4">
      <h2 className="mb-4 text-center">Catálogo de Productos</h2>
      <div className="row">
        {productos.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  p.imagen
                    ? p.imagen
                    : "https://via.placeholder.com/300x200?text=Sin+imagen"
                }
                className="card-img-top"
                alt={p.nombre}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">{p.descripcion}</p>
                <p className="fw-bold">${p.precio}</p>
                <p className="text-muted">Stock disponible: {p.stock}</p>
                <form
                  onSubmit={(e) => handleAddToCart(e, p.id)}
                  className="mt-auto"
                >
                  <input type="hidden" name="accion" value="agregar" />
                  <input type="hidden" name="productoId" value={p.id} />
                  <div className="mb-2">
                    <label
                      htmlFor={`cantidad-${p.id}`}
                      className="form-label"
                    >
                      Cantidad
                    </label>
                    <input
                      type="number"
                      name="cantidad"
                      id={`cantidad-${p.id}`}
                      className="form-control"
                      defaultValue="1"
                      min="1"
                      max={p.stock}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Agregar al carrito
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default ProductsPage;