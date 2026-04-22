const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventarios.controller');

router.get('/', controller.getMovimientos);
router.post('/', controller.createMovimiento);

module.exports = router;