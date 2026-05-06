const Usuario = require('../models/usuarios.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//  Obtener usuarios (protegido)
exports.getUsuarios = async (req, res) => {
  try {
    const data = await Usuario.getAll();
    res.json(data); // ya no trae password desde el model
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear usuario
exports.createUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({
        message: "Nombre, correo y contraseña son obligatorios"
      });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await Usuario.create({
      nombre,
      correo,
      contrasena: hashedPassword
    });

    res.status(201).json({ message: "Usuario creado" });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: "El correo ya está registrado"
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// LOGIN + JWT
exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({
        message: "Correo y contraseña son obligatorios"
      });
    }

    const usuario = await Usuario.findByEmail(correo);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    const contraseñaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!contraseñaValida) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo
      },
      process.env.JWT_SECRET || "clave_default",
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login exitoso",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};