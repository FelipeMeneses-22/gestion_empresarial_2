const Usuario = require('../models/usuarios.model');

exports.getUsuarios = async (req, res) => {
  try {
    const data = await Usuario.getAll();

    // NO enviar contraseñas
    const safeData = data.map(u => {
      const { password, ...rest } = u;
      return rest;
    });

    res.json(safeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: "Nombre, email y contraseña son obligatorios"
      });
    }

    const result = await Usuario.create(req.body);
    res.status(201).json({ message: "Usuario creado" });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: "El email ya está registrado"
      });
    }

    res.status(500).json({ message: error.message });
  }
};
