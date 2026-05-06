const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventarios.controller');
const auth = require('../middlewares/auth');

// TODO protegido (inventario es interno)
router.get('/', auth, controller.getMovimientos);
router.post('/', auth, controller.createMovimiento);

module.exports = router;