"use client";

import React, { useState } from 'react';
import Head from 'next/head';

const LoginPage = () => {
  const [error, setError] = useState(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Login Data:', data);
    // Simula un error
    setError('Correo o contraseña incorrectos.');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Aquí puedes manejar la lógica de registro
    console.log('Register Data:', data);
  };

  return (
    <>
      <Head>
        <title>Login - COPDS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <main className="bg-light">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>

              {/* Mensaje de error */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* FORM LOGIN */}
              <form
                onSubmit={handleLoginSubmit}
                className="border p-4 bg-white rounded shadow-sm"
              >
                <input type="hidden" name="action" value="login" />

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Entrar
                  </button>
                </div>
              </form>

              <hr className="my-5" />

              <h4 className="text-center mb-4">¿No tienes cuenta? Regístrate</h4>

              {/* FORM REGISTRO */}
              <form
                onSubmit={handleRegisterSubmit}
                className="border p-4 bg-white rounded shadow-sm"
              >
                <input type="hidden" name="action" value="register" />

                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;