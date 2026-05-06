const db = require("../config/db");

const Detalle = {
  // Mejor formato de salida (privado)
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT 
        id_detalle AS id,
        pedido_id,
        producto_id,
        cantidad
      FROM detalles
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
         id_detalle AS id,
         pedido_id,
         producto_id,
         cantidad
       FROM detalles 
       WHERE id_detalle = ?`,
      [id]
    );
    return rows[0];
  },

  create: async ({ pedido_id, producto_id, cantidad }) => {
    const [result] = await db.query(
      `INSERT INTO detalles (pedido_id, producto_id, cantidad)
       VALUES (?, ?, ?)` ,
      [pedido_id, producto_id, cantidad]
    );

    return {
      id: result.insertId,
      pedido_id,
      producto_id,
      cantidad,
    };
  },

  update: async (id, { pedido_id, producto_id, cantidad }) => {
    await db.query(
      `UPDATE detalles
       SET pedido_id = ?, producto_id = ?, cantidad = ?
       WHERE id_detalle = ?`,
      [pedido_id, producto_id, cantidad, id]
    );

    return {
      id,
      pedido_id,
      producto_id,
      cantidad,
    };
  },

  delete: async (id) => {
    await db.query(
      "DELETE FROM detalles WHERE id_detalle = ?",
      [id]
    );
  },
};

module.exports = Detalle;