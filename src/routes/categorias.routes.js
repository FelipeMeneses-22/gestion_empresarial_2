const express = require('express');
const router = express.Router();
const controller = require('../controllers/categorias.controller');

router.get('/', controller.getCategorias);
router.get('/:id', controller.getCategoria);
router.post('/', controller.createCategoria);
router.put('/:id', controller.updateCategoria);
router.delete('/:id', controller.deleteCategoria);

module.exports = router;