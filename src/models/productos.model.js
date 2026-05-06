const db = require("../config/db");

const Producto = {
  // Público
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT 
        id_producto AS id,
        nombre_producto AS nombre,
        precio,
        categoria_id
      FROM productos
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
         id_producto AS id,
         nombre_producto AS nombre,
         precio,
         categoria_id
       FROM productos 
       WHERE id_producto = ?`,
      [id]
    );
    return rows[0];
  },

  // Privado
  create: async ({ nombre, precio, categoria_id }) => {
    const [result] = await db.query(
      `INSERT INTO productos (nombre_producto, precio, categoria_id)
       VALUES (?, ?, ?)` ,
      [nombre, precio, categoria_id]
    );

    return {
      id: result.insertId,
      nombre,
      precio,
      categoria_id,
    };
  },

  update: async (id, { nombre, precio, categoria_id }) => {
    await db.query(
      `UPDATE productos
       SET nombre_producto = ?, precio = ?, categoria_id = ?
       WHERE id_producto = ?`,
      [nombre, precio, categoria_id, id]
    );

    return {
      id,
      nombre,
      precio,
      categoria_id,
    };
  },

  delete: async (id) => {
    await db.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id]
    );
  },
};

module.exports = Producto;