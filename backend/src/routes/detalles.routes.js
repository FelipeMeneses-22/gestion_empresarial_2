const express = require('express');
const router = express.Router();
const controller = require('../controllers/detalles.controller');

router.get('/', controller.getDetalles);
router.post('/', controller.createDetalle);

module.exports = router;