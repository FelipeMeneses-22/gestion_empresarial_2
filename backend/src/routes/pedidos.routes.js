const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidos.controller');

router.get('/', controller.getPedidos);
router.post('/', controller.createPedido);

module.exports = router;