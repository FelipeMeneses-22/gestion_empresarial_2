const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller');

// ⚠️  RUTAS ESPECÍFICAS PRIMERO — antes de /:id
// POST /api/usuarios/login
router.post('/login', controller.loginUsuario);

// POST /api/usuarios/cambio-contrasena
router.post('/cambio-contrasena', controller.cambioContrasena);

// GET  /api/usuarios
router.get('/', controller.getUsuarios);

// GET  /api/usuarios/:id
router.get('/:id', controller.getUsuario);

// POST /api/usuarios  (registro)
router.post('/', controller.createUsuario);

// PUT  /api/usuarios/:id
router.put('/:id', controller.updateUsuario);

// DELETE /api/usuarios/:id
router.delete('/:id', controller.deleteUsuario);

module.exports = router;
