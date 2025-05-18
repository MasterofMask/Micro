import Navbar from "@/app/components/navbar";

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/productos", { cache: "no-store" });
  const productos = await res.json();

  return (
    <>
      <Navbar />
      <div className="container mt-5 bg-white rounded shadow p-4">
        <h2 className="mb-4 text-center">Catálogo de Productos</h2>
        <div className="row">
          {productos.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={p.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen"}
                  className="card-img-top"
                  alt={p.nombre}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text">{p.descripcion}</p>
                  <p className="fw-bold">${p.precio}</p>
                  <p className="text-muted">Stock disponible: {p.stock}</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const data = Object.fromEntries(formData);
                      console.log("Producto agregado al carrito:", { productoId: p._id, ...data });
                    }}
                    className="mt-auto"
                  >
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
      </div>
    </>
  );
}
