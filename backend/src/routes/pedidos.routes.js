// src/routes/pedidos.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidos.controller');

router.get('/', controller.getPedidos);
router.get('/:id', controller.getPedido);
router.post('/', controller.createPedido);
router.put('/:id', controller.updatePedido);
router.delete('/:id', controller.deletePedido);

module.exports = router;
