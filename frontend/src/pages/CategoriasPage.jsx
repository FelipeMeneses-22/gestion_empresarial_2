import { useState, useEffect, useCallback } from 'react';
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../services/categorias.service';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [showForm, setShowForm]     = useState(false);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState({ nombre_categoria: '', descripcion: '' });

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try { setCategorias(await getCategorias()); }
    catch { setError('Error al cargar las categorías.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const abrirNuevo = () => {
    setEditing(null);
    setForm({ nombre_categoria: '', descripcion: '' });
    setShowForm(true);
  };

  const abrirEditar = (c) => {
    setEditing(c);
    setForm({ nombre_categoria: c.nombre_categoria, descripcion: c.descripcion || '' });
    setShowForm(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async (e) => {
    e.preventDefault(); setError('');
    try {
      if (editing) {
        await updateCategoria(editing.id_categoria, form);
      } else {
        await createCategoria(form);
      }
      setShowForm(false); setEditing(null); await fetchData();
    } catch (err) { setError(err.response?.data?.message || 'Error al guardar.'); }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    try { await deleteCategoria(id); await fetchData(); }
    catch (err) { setError(err.response?.data?.message || 'Error al eliminar.'); }
  };

  if (loading) return <p style={{ padding: '24px' }}>Cargando...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Categorías</h2>
        <button onClick={abrirNuevo} style={s.btnNew}>+ Nueva</button>
      </div>

      {error && <p className="alert-error">{error}</p>}

      {showForm && (
        <form onSubmit={handleGuardar} style={s.form}>
          <h3 style={{ marginTop: 0 }}>{editing ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
          <div className="form-group">
            <label className="form-label">Nombre *</label>
            <input
              name="nombre_categoria"
              className="form-control"
              value={form.nombre_categoria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <input
              name="descripcion"
              className="form-control"
              value={form.descripcion}
              onChange={handleChange}
            />
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
            <th style={s.th}>Nombre</th>
            <th style={s.th}>Descripción</th>
            <th style={s.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No hay categorías.</td></tr>
          ) : categorias.map((c) => (
            <tr key={c.id_categoria}>
              <td style={s.td}>{c.id_categoria}</td>
              <td style={s.td}>{c.nombre_categoria}</td>
              <td style={s.td}>{c.descripcion || '—'}</td>
              <td style={s.td}>
                <button style={s.btnEdit} onClick={() => abrirEditar(c)}>Editar</button>
                <button style={s.btnDel}  onClick={() => handleEliminar(c.id_categoria)}>Eliminar</button>
              </td>
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
  btnEdit:   { marginRight: '8px', padding: '6px 12px', background: '#e6f4ff', color: '#0077cc', border: '1px solid #99ccee', borderRadius: '4px', cursor: 'pointer' },
  btnDel:    { padding: '6px 12px', background: '#fff0f0', color: '#cc0000', border: '1px solid #ffaaaa', borderRadius: '4px', cursor: 'pointer' },
};
