import ProductoItem from './ProductoItem';

export default function ProductoList({ productos, onEdit, onDelete }) {
  if (!productos.length) {
    return <p style={{ textAlign: 'center', padding: '24px' }}>No hay productos registrados.</p>;
  }

  return (
    <div style={styles.list}>
      {productos.map((p) => (
        <ProductoItem key={p.id} producto={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

const styles = {
  list: {
    border: '1px solid var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
};