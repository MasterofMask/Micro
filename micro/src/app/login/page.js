'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Code to handle the sign-up and sign-in button animation
  useEffect(() => { 
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
   
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });

  return () => {
    document.body.classList.remove('body');
    document.body.classList.remove('container');
    document.body.classList.remove('form-container'); 
  }

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.ok) {
        // Redirección después de login exitoso
        // console.log(data.redirectTo);
        router.push('/');

       
      } else {
        setError(data.msg || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <body className={styles.bodyStyle}>
    <div className={styles.container} id="container">
      <div className={`${styles.formContainer} ${styles.sign-up-container}`}>
        <form action="#">
          <h1>Crear cuenta</h1>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo electr&oacute;nico" />
          <input type="password" placeholder="Contrase&ntilde;a" />
          <button>Registrarse</button>
        </form>
      </div>
      <div className={`${styles.form-container} ${styles.signIn-container}`}>
        <form onSubmit={handleSubmit}>
          <h1>Iniciar sesi&oacute;n</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
                {error}
              </div>
          )}
          <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <a className={styles.link} href="#">&#191;Olvidaste tu contrase&ntilde;a&#63;</a>
          <button>Iniciar sesi&oacute;n</button>
        </form>
      </div>
      <div className={styles.overlay-container}>
        <div className={styles.overlay}>
          <div className={`${styles.overlay-panel} ${styles.overlay-left}`}>
            <h1>&#161;Bienvenido&#33;</h1>
            <p>Para mantenerte en contacto con nosotros, inicia sesión con tus datos personales</p>
            <button className="ghost" id="signIn">Iniciar sesi&oacute;n</button>
          </div>
          <div className={`${styles.overlay-panel} ${styles.overlay-right}`}>
            <h1>&#161;Hola&#33;</h1>
            <p>Reg&iacute;strate para comenzar a comprar con nosotros </p>
            <button className={styles.ghost} id="signUp">Registrarse</button>
          </div>
        </div>
      </div>
    </div>

    {/* <footer>
      <p>
        Created with <i class="fa fa-heart"></i> by
        <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
        - Read how I created this and how you can join the challenge
        <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
      </p>
    </footer> */}
    </body>

    //This is a simple login form using Bootstrap for styling 
    // <div className="container mt-5">
    //   <div className="row justify-content-center">
    //     <div className="col-md-6">
    //       <div className="card">
    //         <div className="card-body">
    //           <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              
    //           {error && (
    //             <div className="alert alert-danger" role="alert">
    //               {error}
    //             </div>
    //           )}
              
    //           <form onSubmit={handleSubmit}>
    //             <div className="mb-3">
    //               <label htmlFor="email" className="form-label">Email</label>
    //               <input
    //                 type="email"
    //                 className="form-control"
    //                 id="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 required
    //               />
    //             </div>
                
    //             <div className="mb-3">
    //               <label htmlFor="password" className="form-label">Contraseña</label>
    //               <input
    //                 type="password"
    //                 className="form-control"
    //                 id="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //               />
    //             </div>
                
    //             <div className="d-grid">
    //               <button 
    //                 type="submit" 
    //                 className="btn btn-primary"
    //                 disabled={loading}
    //               >
    //                 {loading ? (
    //                   <>
    //                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    //                     Iniciando sesión...
    //                   </>
    //                 ) : (
    //                   'Iniciar Sesión'
    //                 )}
    //               </button>
    //             </div>
    //           </form>
              
    //           <div className="mt-3 text-center">
    //             <Link href="/" className="text-decoration-none">
    //               Volver al inicio
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
