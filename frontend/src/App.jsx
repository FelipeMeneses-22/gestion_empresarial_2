import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layouts y guardia
import PublicLayout   from './layouts/PublicLayout';
import PrivateLayout  from './layouts/PrivateLayout';
import PrivateRoute   from './components/PrivateRoute';

// Páginas públicas
import InicioPage          from './pages/InicioPage';
import LoginPage           from './pages/LoginPage';
import RegisterPage        from './pages/RegisterPage';

// Páginas privadas
import HomePage            from './pages/HomePage';
import CambioContrasenaPage from './pages/CambioContrasenaPage';
import ProductosPage       from './pages/ProductosPage';
import CategoriasPage      from './pages/CategoriasPage';
import InventarioPage      from './pages/InventarioPage';
import PedidosPage         from './pages/PedidosPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── RUTAS PÚBLICAS ── */}
        <Route element={<PublicLayout />}>
          <Route index         element={<InicioPage />} />
          <Route path="login"    element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* ── RUTAS PRIVADAS (requieren sesión) ── */}
        <Route
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="home"              element={<HomePage />} />
          <Route path="cambio-contrasena" element={<CambioContrasenaPage />} />
          <Route path="productos"         element={<ProductosPage />} />
          <Route path="categorias"        element={<CategoriasPage />} />
          <Route path="inventario"        element={<InventarioPage />} />
          <Route path="pedidos"           element={<PedidosPage />} />
        </Route>

        {/* Ruta desconocida → inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
