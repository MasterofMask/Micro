import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from './components/navbar';

const HomePage = () => {
  const isUserLoggedIn = false; // Simula el estado de sesión del usuario

  return (
    <>    
      <Head>
        <title>Bienvenido a COPDS</title>
        <meta
          name="description"
          content="Tu tienda en línea de confianza. Calidad, servicio y eficiencia en un solo lugar."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"/> */}
        
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-light text-center text-dark py-5 mt-5">
        <div className="container">
          <h1 className="display-4">
            Bienvenido a <span className="text-primary">COPDS</span>
          </h1>
          <p className="lead">
            Tu tienda en línea de confianza. Calidad, servicio y eficiencia en un solo lugar.
          </p>
          {isUserLoggedIn ? (
            <Link href="/productos" className="btn btn-primary btn-lg mt-3">
              Ir a la tienda
            </Link>
          ) : (
            <Link href="/login" className="btn btn-outline-primary btn-lg mt-3">
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      {/* Misión y Visión */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="mb-5">Nuestra Filosofía</h2>
          <div className="row g-5">
            <div className="col-md-6" data-aos="fade-up">
              <i className="bi bi-bullseye display-3 text-primary mb-3"></i>
              <h4>Misión</h4>
              <p>
                Ofrecer productos de alta calidad con un excelente servicio al cliente, asegurando una experiencia de compra segura, confiable y satisfactoria.
              </p>
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
              <i className="bi bi-eye-fill display-3 text-success mb-3"></i>
              <h4>Visión</h4>
              <p>
                Convertirnos en la plataforma de e-commerce más confiable en México, siendo reconocidos por nuestra innovación, eficiencia y compromiso con el cliente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;