const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidos.controller');
const auth = require('../middlewares/auth');

// TODO protegido
router.get('/', auth, controller.getPedidos);
router.post('/', auth, controller.createPedido);

module.exports = router;