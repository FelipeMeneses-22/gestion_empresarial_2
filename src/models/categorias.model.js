const db = require("../config/db");

const Categoria = {
  // Obtener todas las categorías (público)
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT 
        id_categoria AS id,
        nombre_categoria AS nombre,
        descripcion
      FROM categorias
    `);
    return rows;
  },

  // Obtener una categoría por ID (público)
  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
         id_categoria AS id,
         nombre_categoria AS nombre,
         descripcion
       FROM categorias 
       WHERE id_categoria = ?`,
      [id]
    );
    return rows[0];
  },

  // Crear categoría (privado - descripcion opcional)
  create: async ({ nombre, descripcion = null }) => {
    const [result] = await db.query(
      `INSERT INTO categorias (nombre_categoria, descripcion)
       VALUES (?, ?)` ,
      [nombre, descripcion]
    );

    return {
      id: result.insertId,
      nombre,
      descripcion,
    };
  },

  // Actualizar categoría (privado)
  update: async (id, { nombre, descripcion = null }) => {
    await db.query(
      `UPDATE categorias
       SET nombre_categoria = ?, descripcion = ?
       WHERE id_categoria = ?`,
      [nombre, descripcion, id]
    );

    return {
      id,
      nombre,
      descripcion,
    };
  },

  // Eliminar categoría (privado)
  delete: async (id) => {
    await db.query(
      "DELETE FROM categorias WHERE id_categoria = ?",
      [id]
    );
  },
};

module.exports = Categoria;
