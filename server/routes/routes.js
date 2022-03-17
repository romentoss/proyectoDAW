const express = require('express');

const router = express.Router();


const indexController = require('../controllers/controllerDb.js');
router.get('/', indexController.list);

module.exports = router;