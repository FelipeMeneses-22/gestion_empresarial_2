import { useState, useEffect, useCallback } from 'react';
import { getPedidos, createPedido, updatePedido, deletePedido } from '../services/pedidos.service';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ id_usuario: '', total: '', estado: 'pendiente', fecha: '' });

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try { setPedidos(await getPedidos()); }
    catch { setError('Error al cargar los pedidos.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const abrirNuevo = () => {
    setEditing(null);
    setForm({ id_usuario: '', total: '', estado: 'pendiente', fecha: new Date().toISOString().split('T')[0] });
    setShowForm(true);
  };

  const abrirEditar = (p) => {
    setEditing(p);
    setForm({
      id_usuario: p.id_usuario,
      total: p.total,
      estado: p.estado,
      fecha: p.fecha ? p.fecha.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async (e) => {
    e.preventDefault(); setError('');
    try {
      const payload = {
        id_usuario: parseInt(form.id_usuario),
        total: parseFloat(form.total),
        estado: form.estado,
        fecha: form.fecha
      };
      if (editing) { await updatePedido(editing.id_pedido, payload); }
      else { await createPedido(payload); }
      setShowForm(false); setEditing(null); await fetchData();
    } catch (err) { setError(err.response?.data?.message || 'Error al guardar pedido.'); }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este pedido?')) return;
    try { await deletePedido(id); await fetchData(); }
    catch (err) { setError(err.response?.data?.message || 'Error al eliminar.'); }
  };

  if (loading) return <p style={{ padding: '24px' }}>Cargando...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Pedidos</h2>
        <button onClick={abrirNuevo} style={s.btnNew}>+ Nuevo Pedido</button>
      </div>

      {error && <p className="alert-error">{error}</p>}

      {showForm && (
        <form onSubmit={handleGuardar} style={s.form}>
          <h3 style={{ marginTop: 0 }}>{editing ? 'Editar Pedido' : 'Nuevo Pedido'}</h3>
          <div className="form-group">
            <label className="form-label">ID Usuario *</label>
            <input name="id_usuario" type="number" min="1" className="form-control" value={form.id_usuario} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Total *</label>
            <input name="total" type="number" step="0.01" min="0" className="form-control" value={form.total} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Estado</label>
            <select name="estado" className="form-select" value={form.estado} onChange={handleChange}>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input name="fecha" type="date" className="form-control" value={form.fecha} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" style={s.btnSave}>{editing ? 'Actualizar' : 'Crear'}</button>
            <button type="button" style={s.btnCancel} onClick={() => { setShowForm(false); setEditing(null); }}>Cancelar</button>
          </div>
        </form>
      )}

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>ID</th>
            <th style={s.th}>Usuario</th>
            <th style={s.th}>Fecha</th>
            <th style={s.th}>Total</th>
            <th style={s.th}>Estado</th>
            <th style={s.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No hay pedidos.</td></tr>
          ) : pedidos.map((p) => (
            <tr key={p.id_pedido}>
              <td style={s.td}>{p.id_pedido}</td>
              <td style={s.td}>{p.nombre_usuario || p.id_usuario}</td>
              <td style={s.td}>{p.fecha ? new Date(p.fecha).toLocaleDateString('es-CO') : '—'}</td>
              <td style={s.td}>${Number(p.total).toFixed(2)}</td>
              <td style={s.td}>{p.estado}</td>
              <td style={s.td}>
                <button style={s.btnEdit} onClick={() => abrirEditar(p)}>Editar</button>
                <button style={s.btnDel} onClick={() => handleEliminar(p.id_pedido)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const s = {
  btnNew: { padding: '8px 16px', background: '#00aaff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  form: { border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '24px', background: '#fafafa' },
  btnSave: { flex: 1, padding: '10px', background: '#00aaff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnCancel: { flex: 1, padding: '10px', background: 'transparent', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#f4f2da', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #d2d0bd', fontWeight: '700' },
  td: { padding: '10px 14px', borderBottom: '1px solid #eee' },
  btnEdit: { marginRight: '8px', padding: '6px 12px', background: '#e6f4ff', color: '#0077cc', border: '1px solid #99ccee', borderRadius: '4px', cursor: 'pointer' },
  btnDel: { padding: '6px 12px', background: '#fff0f0', color: '#cc0000', border: '1px solid #ffaaaa', borderRadius: '4px', cursor: 'pointer' },
};
