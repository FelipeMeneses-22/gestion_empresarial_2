import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/buisness.png';
import '../styles/layout.css';

export default function PublicLayout() {
  return (
    <div className="page-body">
      <header className="site-header">
        <div className="header-inner">
          <img src={logo} alt="Business Management" className="logo-img" />
          <h1 className="site-title">BUSINESS<br />MANAGEMENT</h1>
        </div>
        <p className="welcome-text">Hola Visitante</p>
        <nav className="nav-strip">
          <div className="nav-list">
            <NavLink className="nav-link" to="/" end>Inicio</NavLink>
            <NavLink className="nav-link" to="/register">Registrarse</NavLink>
            <NavLink className="nav-link" to="/login">Ingresar</NavLink>
            <NavLink className="nav-link" to="/cambio-contrasena">Cambio de contraseña</NavLink>
            
          </div>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>© Business Management</p>
        <div className="footer-links">
          <a href="#">Contacto</a>
          <a href="#">Términos de uso</a>
          <a href="#">Soporte</a>
        </div>
      </footer>
    </div>
  );
}
