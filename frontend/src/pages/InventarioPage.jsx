import { useState, useEffect, useCallback } from 'react';
import { getMovimientos, createMovimiento } from '../services/inventario.service';
import { getProductos } from '../services/productos.service';

export default function InventarioPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [showForm, setShowForm]       = useState(false);

  // Leer usuario logueado desde localStorage
  const usuarioLogueado = (() => {
    try { return JSON.parse(localStorage.getItem('usuarioActivo') || '{}'); }
    catch { return {}; }
  })();

  const [form, setForm] = useState({
    id_producto: '',
    id_usuario: usuarioLogueado.id_usuario || '',
    tipo: 'entrada',
    cantidad: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [movs, prods] = await Promise.all([getMovimientos(), getProductos()]);
      setMovimientos(movs);
      setProductos(prods);
    } catch { setError('Error al cargar el inventario.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async (e) => {
    e.preventDefault(); setError('');
    try {
      await createMovimiento({
        id_producto:  parseInt(form.id_producto),
        id_usuario:   parseInt(form.id_usuario) || usuarioLogueado.id_usuario || 1,
        tipo:         form.tipo,
        cantidad:     parseInt(form.cantidad),
        cantidad_mov: parseInt(form.cantidad),
        fecha:        form.fecha || new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      setForm({ id_producto: '', id_usuario: usuarioLogueado.id_usuario || '', tipo: 'entrada', cantidad: '', fecha: new Date().toISOString().split('T')[0] });
      await fetchData();
    } catch (err) { setError(err.response?.data?.message || 'Error al registrar movimiento.'); }
  };

  if (loading) return <p style={{ padding: '24px' }}>Cargando...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Inventario</h2>
        <button
          onClick={() => {
            setForm({ id_producto: '', id_usuario: usuarioLogueado.id_usuario || '', tipo: 'entrada', cantidad: '', fecha: new Date().toISOString().split('T')[0] });
            setShowForm(!showForm);
          }}
          style={s.btnNew}
        >
          + Movimiento
        </button>
      </div>

      {error && <p className="alert-error">{error}</p>}

      {showForm && (
        <form onSubmit={handleGuardar} style={s.form}>
          <h3 style={{ marginTop: 0 }}>Registrar Movimiento</h3>
          <div className="form-group">
            <label className="form-label">Producto *</label>
            <select name="id_producto" className="form-select" value={form.id_producto} onChange={handleChange} required>
              <option value="">Selecciona un producto</option>
              {productos.map((p) => (
                <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">ID Usuario *</label>
            <input name="id_usuario" type="number" min="1" className="form-control" value={form.id_usuario} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo *</label>
            <select name="tipo" className="form-select" value={form.tipo} onChange={handleChange}>
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
              <option value="ajuste">Ajuste</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Cantidad *</label>
            <input name="cantidad" type="number" min="1" className="form-control" value={form.cantidad} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input name="fecha" type="date" className="form-control" value={form.fecha} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" style={s.btnSave}>Registrar</button>
            <button type="button" style={s.btnCancel} onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>ID</th>
            <th style={s.th}>Producto</th>
            <th style={s.th}>Usuario</th>
            <th style={s.th}>Tipo</th>
            <th style={s.th}>Cantidad</th>
            <th style={s.th}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No hay movimientos.</td></tr>
          ) : movimientos.map((m) => (
            <tr key={m.id_movimiento}>
              <td style={s.td}>{m.id_movimiento}</td>
              <td style={s.td}>{m.nombre_producto || m.id_producto}</td>
              <td style={s.td}>{m.nombre_usuario  || m.id_usuario}</td>
              <td style={s.td}>
                <span style={{
                  color: m.tipo === 'entrada' ? '#155724' : m.tipo === 'salida' ? '#721c24' : '#856404',
                  fontWeight: 'bold'
                }}>
                  {m.tipo}
                </span>
              </td>
              <td style={s.td}>{m.cantidad}</td>
              <td style={s.td}>{m.fecha ? new Date(m.fecha).toLocaleDateString('es-CO') : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const s = {
  btnNew:    { padding: '8px 16px', background: '#00aaff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  form:      { border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '24px', background: '#fafafa' },
  btnSave:   { flex: 1, padding: '10px', background: '#00aaff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnCancel: { flex: 1, padding: '10px', background: 'transparent', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' },
  table:     { width: '100%', borderCollapse: 'collapse' },
  th:        { background: '#f4f2da', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #d2d0bd', fontWeight: '700' },
  td:        { padding: '10px 14px', borderBottom: '1px solid #eee' },
};
