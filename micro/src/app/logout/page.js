"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function performLogout() {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const data = await response.json();

        if (data.ok) {
          // Forzar recarga para limpiar todo
          window.location.href = data.redirectTo || "/";
        } else {
          console.error("Error al cerrar sesión:", data.msg);
          router.replace("/");
        }
      } catch (error) {
        console.error("Error inesperado al cerrar sesión:", error);
        router.replace("/");
      }
    }

    performLogout();
  }, [router]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cerrando sesión...</span>
        </div>
        <p className="mt-3 fs-5">Cerrando sesión...</p>
      </div>
    </div>
  );
}