import api from "../api/axiosConfig";

export const getProductos = async () => {
  const res = await api.get("/productos");
  return res.data.data;
};

export const getProductoById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data.data;
};

export const createProducto = async (producto) => {
  const res = await api.post("/productos", producto);
  return res.data.data;
};

export const updateProducto = async (id, producto) => {
  const res = await api.put(`/productos/${id}`, producto);
  return res.data.data;
};

export const deleteProducto = async (id) => {
  const res = await api.delete(`/productos/${id}`);
  return res.data;
};
