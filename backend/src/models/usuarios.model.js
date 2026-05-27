// src/models/usuarios.model.js
const db = require("../config/db");

const Usuario = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM usuarios");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?", [id]
    );
    return rows[0];
  },

  // Buscar por correo (para cambio de contraseña)
  findByEmail: async (correo) => {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ?", [correo]
    );
    return rows[0];
  },

  // Login: busca por correo + contrasena (+ rol si se envía)
  findByEmailAndPassword: async (correo, contrasena, rol) => {
    let sql = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
    const params = [correo, contrasena];
    if (rol !== undefined && rol !== null && rol !== '') {
      sql += " AND rol = ?";
      params.push(rol);
    }
    const [rows] = await db.query(sql, params);
    return rows[0];
  },

  // Crear usuario
  create: async ({ nombre, correo, contrasena, rol }) => {
    const rolValue = (rol !== undefined && rol !== null && rol !== '') ? rol : 2;
    const [result] = await db.query(
      `INSERT INTO usuarios (nombre, correo, contrasena, rol)
       VALUES (?, ?, ?, ?)`,
      [nombre, correo, contrasena, rolValue]
    );
    return { id: result.insertId, nombre, correo };
  },

  update: async (id, { nombre, correo, contrasena }) => {
    await db.query(
      `UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id_usuario = ?`,
      [nombre, correo, contrasena, id]
    );
    return { id, nombre, correo };
  },

  delete: async (id) => {
    await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
  },
};

module.exports = Usuario;
