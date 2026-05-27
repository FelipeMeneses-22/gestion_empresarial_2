import api from '../api/axiosConfig';

/**
 * Registro → POST /api/usuarios
 * Envía los campos tal como los espera el backend: { nombre, correo, contrasena, rol }
 */
export const registerUsuario = async ({ nombre, correo, contrasena, rol }) => {
  const res = await api.post('/usuarios', { nombre, correo, contrasena, rol });
  return res.data; // { message: "Usuario creado correctamente" }
};

/**
 * Login → POST /api/usuarios/login
 * Envía: { correo, contrasena, rol }
 */
export const loginUsuario = async ({ correo, contrasena, rol }) => {
  const res = await api.post('/usuarios/login', { correo, contrasena, rol });
  return res.data; // { status, usuario }
};

/**
 * Cambio de contraseña → POST /api/usuarios/cambio-contrasena
 */
export const cambiarContrasena = async ({ correo }) => {
  const res = await api.post('/usuarios/cambio-contrasena', { correo });
  return res.data;
};
