const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller');
const auth = require('../middlewares/auth');

// 🔓 Público
router.post('/login', controller.login);
router.post('/', controller.createUsuario);

// 🔐 Protegido
router.get('/', auth, controller.getUsuarios);

module.exports = router;