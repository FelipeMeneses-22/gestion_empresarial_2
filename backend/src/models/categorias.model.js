// src/models/categorias.model.js
const db = require("../config/db");

const Categoria = {
  //  Obtener todas las categorías
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM categorias");
    return rows;
  },

  //  Obtener una categoría por ID
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM categorias WHERE id_categoria = ?",
      [id],
    );
    return rows[0];
  },

  //  Crear categoría
  create: async ({ nombre, descripcion }) => {
    const [result] = await db.query(
      `INSERT INTO categorias (nombre_categoria, descripcion)
       VALUES (?, ?)`,
      [nombre, descripcion],
    );

    return {
      id: result.insertId,
      nombre,
      descripcion,
    };
  },

  // Actualizar categoría
  update: async (id, { nombre, descripcion }) => {
    await db.query(
      `UPDATE categorias
       SET nombre_categoria = ?, descripcion = ?
       WHERE id_categoria = ?`,
      [nombre, descripcion, id],
    );

    return {
      id,
      nombre,
      descripcion,
    };
  },

  // Eliminar categoría
  delete: async (id) => {
    await db.query("DELETE FROM categorias WHERE id_categoria = ?", [id]);
  },
};

module.exports = Categoria;
