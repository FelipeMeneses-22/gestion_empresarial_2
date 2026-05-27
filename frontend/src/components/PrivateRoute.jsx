import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const usuario = (() => {
    try { return JSON.parse(localStorage.getItem('usuarioActivo')); }
    catch { return null; }
  })();

  if (!usuario) return <Navigate to="/login" replace />;
  return children;
}
