"use client";

export default function ListaProductos({ productos }) {
  const handleSubmit = async (e, producto) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productoId: values.productoId,
          cantidad: parseInt(values.cantidad, 10),
          nombre: producto.nombre,
          precio: producto.precio,
        }),
      });

      const result = await response.json();
      if (result.ok) {
        alert("Producto agregado al carrito ✅");
      } else {
        alert("❌ Error: " + result.msg);
      }
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      alert("❌ Error inesperado al agregar al carrito");
    }
  };

  return (
    <div className="row">
      {productos.map((p) => (
        <div className="col-md-4 mb-4" key={p._id}>
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white">
            <img
              src={p.imagen || "https://i.ibb.co/6JVXWSc2/d0ba2ca16eb107f45152548f81a727e0.jpg"}
              className="card-img-top imgCard"
              alt={p.nombre}
            />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{p.nombre}</h5>
              <p className="card-text">{p.descripcion}</p>
              <p className="fw-bold">${p.precio}</p>
              <p className="text-muted">Stock disponible: {p.stock}</p>
              <form onSubmit={(e) => handleSubmit(e, p)} className="mt-auto">
                <input type="hidden" name="accion" value="agregar" />
                <input type="hidden" name="productoId" value={p._id} />
                <div className="mb-2">
                  <label htmlFor={`cantidad-${p._id}`} className="form-label">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    id={`cantidad-${p._id}`}
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
  );
}
