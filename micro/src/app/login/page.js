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
   
  signUpButton?.addEventListener('click', () => {
    container?.classList.add(styles.rightPanelActive);
  });

  signInButton?.addEventListener('click', () => {
    container?.classList.remove(styles.rightPanelActive);
  });

  // Clean up event listeners
  return () => {
    signUpButton?.removeEventListener('click', () => {
      container?.classList.add(styles.rightPanelActive);
    });
    signInButton?.removeEventListener('click', () => {
      container?.classList.remove(styles.rightPanelActive);
    });
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
    <div className={styles.bodyStyle} id="body">
    <div className={styles.container} id="container">
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form className={styles.form}>
          <h1 className={styles.heading}>Crear cuenta</h1>
          <input className={styles.formInput} type="text" placeholder="Nombre" />
          <input className={styles.formInput} type="email" placeholder="Correo electr&oacute;nico" />
          <input className={styles.formInput} type="password" placeholder="Contrase&ntilde;a" />
          <button className={styles.formButton}>Registrarse</button>
        </form>
      </div>
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Iniciar sesi&oacute;n</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
          )}
          <input className={styles.formInput} type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input className={styles.formInput} type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <a className={styles.link} href="#">&#191;Olvidaste tu contrase&ntilde;a&#63;</a>
          <button className={styles.formButton}>Iniciar sesi&oacute;n</button>
        </form>
      </div>
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1 className={styles.heading}>&#161;Bienvenido&#33;</h1>
            <p className={styles.paragraph}>Para mantenerte en contacto con nosotros, inicia sesión con tus datos personales</p>
            <button className={styles.ghostButton} id="signIn">Iniciar sesi&oacute;n</button>
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1 className={styles.heading}>&#161;Hola&#33;</h1>
            <p className={styles.paragraph}>Reg&iacute;strate para comenzar a comprar con nosotros </p>
            <button className={styles.ghostButton} id="signUp">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}
