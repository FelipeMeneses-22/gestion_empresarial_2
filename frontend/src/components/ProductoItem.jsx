export default function ProductoItem({ producto, onEdit, onDelete }) {
  return (
    <div style={styles.item}>
      <div style={styles.info}>
        <h3 style={styles.nombre}>{producto.nombre}</h3>
        <p style={styles.precio}>${Number(producto.precio).toFixed(2)}</p>
        <p style={styles.stock}>Stock: {producto.stock ?? 0}</p>
      </div>
      <div style={styles.actions}>
        <button style={styles.btnEdit} onClick={() => onEdit(producto)}>Editar</button>
        <button style={styles.btnDelete} onClick={() => onDelete(producto.id)}>Eliminar</button>
      </div>
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border)',
  },
  info: { textAlign: 'left' },
  nombre: { margin: '0 0 4px', fontSize: '16px' },
  precio: { margin: '0 0 2px', color: 'var(--accent)', fontWeight: 'bold' },
  stock: { margin: 0, fontSize: '14px', color: 'var(--text)' },
  actions: { display: 'flex', gap: '8px' },
  btnEdit: {
    padding: '6px 12px',
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  btnDelete: {
    padding: '6px 12px',
    background: '#ff4d4f22',
    color: '#ff4d4f',
    border: '1px solid #ff4d4f66',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};