const db = require('../config/db');

const Categoria = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
    return rows[0];
  },

  create: async ({ nombre_categoria, descripcion }) => {
    const [result] = await db.query(
      'INSERT INTO categorias (nombre_categoria, descripcion) VALUES (?, ?)',
      [nombre_categoria, descripcion || null]
    );
    return { id_categoria: result.insertId, nombre_categoria, descripcion };
  },

  update: async (id, { nombre_categoria, descripcion }) => {
    await db.query(
      'UPDATE categorias SET nombre_categoria = ?, descripcion = ? WHERE id_categoria = ?',
      [nombre_categoria, descripcion || null, id]
    );
    return { id_categoria: id, nombre_categoria, descripcion };
  },

  delete: async (id) => {
    await db.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);
  },
};

module.exports = Categoria;
