const db = require("../config/db");

const Usuario = {
  // NO traer password
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT 
        id_usuario AS id,
        nombre,
        correo
      FROM usuarios
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
         id_usuario AS id,
         nombre,
         correo
       FROM usuarios 
       WHERE id_usuario = ?`,
      [id]
    );
    return rows[0];
  },

  // Para login (sí trae password)
  findByEmail: async (correo) => {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );
    return rows[0];
  },

  create: async ({ nombre, correo, contrasena }) => {
    const [result] = await db.query(
      `INSERT INTO usuarios (nombre, correo, contrasena)
       VALUES (?, ?, ?)` ,
      [nombre, correo, contrasena]
    );

    return {
      id: result.insertId,
      nombre,
      correo,
    };
  },

  update: async (id, { nombre, correo , contrasena }) => {
    await db.query(
      `UPDATE usuarios
       SET nombre = ?, correo = ?, contrasena = ?
       WHERE id_usuario = ?`,
      [nombre, correo, contrasena, id]
    );

    return {
      id,
      nombre,
      correo,
    };
  },

  delete: async (id) => {
    await db.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      [id]
    );
  },
};

module.exports = Usuario;