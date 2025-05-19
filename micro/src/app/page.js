'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <main className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold mb-4">Bienvenido a COPDS</h1>
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