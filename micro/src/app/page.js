import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from './components/navbar';
import { cookies } from "next/headers";
export default function HomePage() {
  const cookieStore = cookies();
  const userLogged = cookieStore.get("user_id");
  const isUserLoggedIn = !!userLogged;

  return (
    <main className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold mb-4">Bienvenido a COPDS</h1>
            <p className="lead mb-4">
              Sistema de compras en línea para componentes y soluciones de
              servidores.
            </p>

            {isUserLoggedIn ? (
              <>
                <Link href="/productos" className="btn btn-primary btn-lg me-2">
                  Ir a la tienda
                </Link>
                <form
                  action="/api/auth/logout"
                  method="POST"
                  style={{ display: "inline" }}
                >
                  <button type="submit" className="btn btn-danger btn-lg">
                    Cerrar sesión
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="btn btn-outline-primary btn-lg">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}