import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const isUserLoggedIn = true; // Simula el estado de sesión del usuario

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bgGradient fixed-top">
      <div className="container">
        <Link href="/" className="navbar-brand">
          COPDS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isUserLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link href="/products" className="nav-link">
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/cart" className="nav-link">
                    Carrito
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/orders" className="nav-link">
                    Pedidos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/checkout" className="nav-link">
                    Pagos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/logout" className="nav-link text-warning">
                    Cerrar sesión
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link">
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;