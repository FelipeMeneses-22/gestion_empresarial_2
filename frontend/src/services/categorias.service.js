import api from '../api/axiosConfig';

export const getCategorias = async () => {
  const res = await api.get('/categorias');
  return res.data;
};

export const getCategoriaById = async (id) => {
  const res = await api.get(`/categorias/${id}`);
  return res.data;
};

// Envía nombre_categoria (nombre de columna real en BD)
export const createCategoria = async ({ nombre_categoria, descripcion }) => {
  const res = await api.post('/categorias', { nombre_categoria, descripcion });
  return res.data;
};

export const updateCategoria = async (id, { nombre_categoria, descripcion }) => {
  const res = await api.put(`/categorias/${id}`, { nombre_categoria, descripcion });
  return res.data;
};

export const deleteCategoria = async (id) => {
  const res = await api.delete(`/categorias/${id}`);
  return res.data;
};
