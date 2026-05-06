const express = require('express');
const router = express.Router();
const controller = require('../controllers/detalles.controller');
const auth = require('../middlewares/auth');

// TODO protegido (pertenece a pedidos)
router.get('/', auth, controller.getDetalles);
router.post('/', auth, controller.createDetalle);

module.exports = router;