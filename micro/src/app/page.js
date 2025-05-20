'use client';

import { useState, useEffect, React } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include' // importante para incluir cookies
        });
        const data = await response.json();
        
        setIsLoggedIn(data.isAuthenticated);
        if (data.isAuthenticated && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.ok) {
        setIsLoggedIn(false);
        setUser(null);
        // Opcional: redirigir si es necesario
        window.location.href = data.redirectTo || '/';
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center bgGradient">
      <div className="container-fluid">
        <div className="row position-fixed h-50 top-0 start-1 p-3 ml-3">
          <div className="col-md-12 h-25 d-flex align-items-center ">
            <img className="logo" src="https://i.ibb.co/hJXD2FMP/COPDS-removebg-preview.png" alt="COPDS Logo"/>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5">
            <div className="p-5 h-100 d-inline-block rounded align-content-center boxShadow">
              <h1 className="display-4 mb-4 h1Text">Bienvenido a COPDS</h1>
              <p className="lead mb-4">
                Sistema de compras en línea para componentes y soluciones de
                servidores.
              </p>
           

            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : isLoggedIn ? (
              <>
                <Link href="/products" className="btn btn-primary btn-lg me-2">
                  Ir a la tienda
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-danger btn-lg"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link href="/login" className=" btn btn-outline-warning btn-lg">
                Iniciar sesión
              </Link>
            )} 
            </div>
          </div>
          <div className="col-md-6">
            <img className="mainImage" src="https://i.ibb.co/PzD8sm6W/1032-Photoroom.png" alt="zoom-Background1" border="0" />
        </div>
        </div>
      </div>
    </main>

  );
}