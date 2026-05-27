const express = require('express');
const router = express.Router();
const controller = require('../controllers/comprobantes.controller');

router.get('/', controller.getComprobantes);
router.post('/', controller.createComprobante);

module.exports = router;