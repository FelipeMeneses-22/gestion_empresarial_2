const express = require('express');
const router = express.Router();
const controller = require('../controllers/comprobantes.controller');
const auth = require('../middlewares/auth');

// TODO protegido (privado - facturación es sensible)
router.get('/', auth, controller.getComprobantes);
router.post('/', auth, controller.createComprobante);

module.exports = router;