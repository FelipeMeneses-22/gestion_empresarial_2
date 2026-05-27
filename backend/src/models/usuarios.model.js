// src/models/usuarios.model.js
const db = require("../config/db");

const Usuario = {
  // Obtener todos los usuarios
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM usuarios");
    return rows;
  },

  // Obtener usuario por ID (opcional)
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    return rows[0];
  },

  // Crear usuario
  create: async ({ nombre, email, password }) => {
    const [result] = await db.query(
      `INSERT INTO usuarios (nombre, email, password)
       VALUES (?, ?, ?)`,
      [nombre, email, password]
    );

    return {
      id: result.insertId,
      nombre,
      email,
    };
  },

  // Actualizar usuario (opcional)
  update: async (id, { nombre, email, password }) => {
    await db.query(
      `UPDATE usuarios
       SET nombre = ?, email = ?, password = ?
       WHERE id_usuario = ?`,
      [nombre, email, password, id]
    );

    return {
      id,
      nombre,
      email,
    };
  },

  // Eliminar usuario (opcional)
  delete: async (id) => {
    await db.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      [id]
    );
  },
};

module.exports = Usuario;