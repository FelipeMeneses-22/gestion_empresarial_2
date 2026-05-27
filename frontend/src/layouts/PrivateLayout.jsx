import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/buisness.png';
import '../styles/layout.css';

// rol en BD: 1=Administrador, 2=Gerente, 3=Asistente
const OPCIONES_ROL = {
  1: [
    { label: 'Productos',  path: '/productos' },
    { label: 'Categorías', path: '/categorias' },
    { label: 'Inventario', path: '/inventario' },
    { label: 'Pedidos',    path: '/pedidos' },
  ],
  2: [
    { label: 'Inventario', path: '/inventario' },
    { label: 'Pedidos',    path: '/pedidos' },
    { label: 'Productos',  path: '/productos' },
  ],
  3: [
    { label: 'Productos',  path: '/productos' },
    { label: 'Inventario', path: '/inventario' },
  ],
};

// Nombre legible del rol
const NOMBRE_ROL = { 1: 'Administrador', 2: 'Gerente', 3: 'Asistente' };

export default function PrivateLayout() {
  const navigate = useNavigate();

  const usuario = (() => {
    try { return JSON.parse(localStorage.getItem('usuarioActivo')); }
    catch { return null; }
  })();

  const opciones = OPCIONES_ROL[usuario?.rol] || [];

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const handleMenuChange = (e) => {
    const path = e.target.value;
    if (path) { navigate(path); e.target.value = ''; }
  };

  return (
    <div className="page-body">
      <header className="site-header">
        <div className="header-inner">
          <img src={logo} alt="Business Management" className="logo-img" />
          <h1 className="site-title">BUSINESS<br />MANAGEMENT</h1>
        </div>
        <p className="welcome-text">
          Bienvenido {usuario?.nombre} — rol: <strong>{NOMBRE_ROL[usuario?.rol] || usuario?.rol}</strong>
        </p>
        <nav className="nav-strip">
            <div className="nav-list">
              <NavLink className="nav-link" to="/home">Inicio</NavLink>
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
              <NavLink className="nav-link" to="/inventario">Inventario</NavLink>
              <NavLink className="nav-link" to="/pedidos">Pedidos</NavLink>
              <NavLink className="nav-link" to="/cambio-contrasena">Cambio de contraseña</NavLink>
              <button className="nav-link" onClick={cerrarSesion}>Salir</button>
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
