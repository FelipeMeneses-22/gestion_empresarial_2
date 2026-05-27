// src/models/productos.model.js
const db = require("../config/db");

const Producto = {
  // Obtener todos los productos con nombre de categoría
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT p.*, c.nombre_categoria
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
    `);
    return rows;
  },

  // Obtener producto por ID
  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT p.*, c.nombre_categoria
       FROM productos p
       LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
       WHERE p.id_producto = ?`,
      [id]
    );
    return rows[0];
  },

  // Crear producto
  create: async ({ nombre, descripcion, precio_venta, stock_actual, stock_minimo, estado, id_categoria }) => {
    const [result] = await db.query(
      `INSERT INTO productos (nombre, descripcion, precio_venta, stock_actual, stock_minimo, estado, id_categoria)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        descripcion || null,
        precio_venta,
        stock_actual || 0,
        stock_minimo || 0,
        estado !== undefined ? estado : 1,
        id_categoria
      ]
    );
    return { id: result.insertId, nombre, precio_venta, id_categoria };
  },

  // Actualizar producto
  update: async (id, { nombre, descripcion, precio_venta, stock_actual, stock_minimo, estado, id_categoria }) => {
    await db.query(
      `UPDATE productos
       SET nombre = ?, descripcion = ?, precio_venta = ?, stock_actual = ?,
           stock_minimo = ?, estado = ?, id_categoria = ?
       WHERE id_producto = ?`,
      [nombre, descripcion || null, precio_venta, stock_actual, stock_minimo, estado, id_categoria, id]
    );
    return { id, nombre, precio_venta, id_categoria };
  },

  // Eliminar producto
  delete: async (id) => {
    await db.query("DELETE FROM productos WHERE id_producto = ?", [id]);
  },
};

module.exports = Producto;
