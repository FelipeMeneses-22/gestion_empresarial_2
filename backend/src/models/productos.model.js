// src/models/productos.model.js
const db = require("../config/db");

const Producto = {
  // Obtener todos los productos
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM productos");
    return rows;
  },

  // Obtener producto por ID
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id],
    );
    return rows[0];
  },

  // Crear producto
  create: async ({ nombre, precio, categoria_id }) => {
    const [result] = await db.query(
      `INSERT INTO productos (nombre_producto, precio, categoria_id)
       VALUES (?, ?, ?)`,
      [nombre, precio, categoria_id],
    );

    return {
      id: result.insertId,
      nombre,
      precio,
      categoria_id,
    };
  },

  // Actualizar producto
  update: async (id, { nombre, precio, categoria_id }) => {
    await db.query(
      `UPDATE productos
       SET nombre_producto = ?, precio = ?, categoria_id = ?
       WHERE id_producto = ?`,
      [nombre, precio, categoria_id, id],
    );

    return {
      id,
      nombre,
      precio,
      categoria_id,
    };
  },

  // Eliminar producto
  delete: async (id) => {
    await db.query("DELETE FROM productos WHERE id_producto = ?", [id]);
  },
};

module.exports = Producto;
