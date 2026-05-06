const express = require('express');
const router = express.Router();
const controller = require('../controllers/categorias.controller');
const auth = require('../middlewares/auth');

// RUTAS PÚBLICAS (cualquiera puede ver)
router.get('/', controller.getCategorias);
router.get('/:id', controller.getCategoria);

// RUTAS PROTEGIDAS (requieren login)
router.post('/', auth, controller.createCategoria);
router.put('/:id', auth, controller.updateCategoria);
router.delete('/:id', auth, controller.deleteCategoria);

module.exports = router;