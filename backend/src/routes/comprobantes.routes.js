// src/routes/comprobantes.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/comprobantes.controller');

router.get('/', controller.getComprobantes);
router.get('/:id', controller.getComprobante);
router.post('/', controller.createComprobante);
router.put('/:id', controller.updateComprobante);
router.delete('/:id', controller.deleteComprobante);

module.exports = router;
