const express = require('express');
const router = express.Router();
const controller = require('../controllers/detalles.controller');

// ⚠️ Ruta específica PRIMERO
router.get('/pedido/:id', controller.getDetallesByPedido);

router.get('/',    controller.getDetalles);
router.post('/',   controller.createDetalle);
router.put('/:id', controller.updateDetalle);
router.delete('/:id', controller.deleteDetalle);

module.exports = router;
