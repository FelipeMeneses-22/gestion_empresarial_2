// src/routes/usuario.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller');

// Obtener todos los usuarios
// GET http://localhost:3000/api/usuarios
router.get('/', controller.getUsuarios);

// Crear un nuevo usuario
// POST http://localhost:3000/api/usuarios
router.post('/', controller.createUsuario);

module.exports = router;