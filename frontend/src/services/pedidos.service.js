import api from '../api/axiosConfig';

export const getPedidos = async () => {
  const res = await api.get('/pedidos');
  return res.data;
};

export const getPedidoById = async (id) => {
  const res = await api.get(`/pedidos/${id}`);
  return res.data;
};

/**
 * Campos que espera el backend:
 * id_usuario, fecha (opcional), total, estado (opcional)
 */
export const createPedido = async (data) => {
  const res = await api.post('/pedidos', data);
  return res.data;
};

export const updatePedido = async (id, data) => {
  const res = await api.put(`/pedidos/${id}`, data);
  return res.data;
};

export const deletePedido = async (id) => {
  const res = await api.delete(`/pedidos/${id}`);
  return res.data;
};
