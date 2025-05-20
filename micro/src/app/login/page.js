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

  // Animación del contenedor
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

    return () => {
      signUpButton?.removeEventListener('click', () => {
        container?.classList.add(styles.rightPanelActive);
      });
      signInButton?.removeEventListener('click', () => {
        container?.classList.remove(styles.rightPanelActive);
      });
    };
  }, []);

  // Login
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
        router.push('/products');
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

  // Registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.target;
    const nombre = form[0].value;
    const email = form[1].value;
    const password = form[2].value;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (data.ok) {
        router.push('/products');
      } else {
        setError(data.msg || 'Error al registrarse');
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
        {/* Registro */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.form} onSubmit={handleRegisterSubmit}>
            <h1 className={styles.heading}>Crear cuenta</h1>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <input className={styles.formInput} type="text" placeholder="Nombre" required />
            <input className={styles.formInput} type="email" placeholder="Correo electr&oacute;nico" required />
            <input className={styles.formInput} type="password" placeholder="Contrase&ntilde;a" required />
            <button type="submit" className={styles.formButton}>
              Registrarse
            </button>
          </form>
        </div>

        {/* Login */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>Iniciar sesi&oacute;n</h1>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <input
              className={styles.formInput}
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.formInput}
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a className={styles.link} href="#">
              &#191;Olvidaste tu contrase&ntilde;a&#63;
            </a>
            <button type="submit" className={styles.formButton}>
              Iniciar sesi&oacute;n
            </button>
          </form>
        </div>

        {/* Paneles */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.heading}>&#161;Bienvenido&#33;</h1>
              <p className={styles.paragraph}>
                Para mantenerte en contacto con nosotros, inicia sesión con tus datos personales
              </p>
              <button className={styles.ghostButton} id="signIn">
                Iniciar sesi&oacute;n
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.heading}>&#161;Hola&#33;</h1>
              <p className={styles.paragraph}>Reg&iacute;strate para comenzar a comprar con nosotros </p>
              <button className={styles.ghostButton} id="signUp">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
