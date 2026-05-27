// src/controllers/usuarios.controller.js
const Usuario = require('../models/usuarios.model');

exports.getUsuarios = async (req, res) => {
  try {
    const data = await Usuario.getAll();
    const safeData = data.map(u => {
      const { contrasena, ...rest } = u;
      return rest;
    });
    res.json(safeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Usuario.getById(id);
    if (!data) return res.status(404).json({ message: "Usuario no encontrado" });
    const { contrasena, ...safe } = data;
    res.json(safe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/usuarios  (registro)
exports.createUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;
    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ message: "Nombre, correo y contraseña son obligatorios" });
    }
    await Usuario.create({ nombre, correo, contrasena, rol });
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
    res.status(500).json({ message: error.message });
  }
};

// POST /api/usuarios/login
exports.loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena, rol } = req.body;
    // Compatibilidad con frontend que puede enviar 'email' o 'password'
    const emailVal = correo || req.body.email;
    const passVal  = contrasena || req.body.password;

    if (!emailVal || !passVal) {
      return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
    }
    const usuario = await Usuario.findByEmailAndPassword(emailVal, passVal, rol);
    if (!usuario) {
      return res.status(401).json({ status: 'error', message: "Credenciales incorrectas" });
    }
    const { contrasena: _p, ...safeUsuario } = usuario;
    res.json({ status: 'ok', usuario: safeUsuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/usuarios/cambio-contrasena
exports.cambioContrasena = async (req, res) => {
  try {
    const correo = req.body.correo || req.body.email;
    if (!correo) return res.status(400).json({ message: "El correo es obligatorio" });
    await Usuario.findByEmail(correo);
    // Respondemos igual exista o no (evita enumeración de usuarios)
    res.json({ status: 'ok', message: "Si el correo existe, recibirás instrucciones de recuperación." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body;
    const result = await Usuario.update(id, { nombre, correo, contrasena });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.delete(id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
