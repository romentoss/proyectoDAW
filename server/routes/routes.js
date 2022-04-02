const express = require('express');

const router = express.Router();


const indexController = require('../controllers/controllerDb.js');
router.get('/join', indexController.list);


const listsController = require('../controllers/controllerDb.js');
router.get('/listas', listsController.listas);

const filmsController = require('../controllers/controllerDb.js');
router.get('/peliculas', filmsController.peliculas);

const usersController = require('../controllers/controllerDb.js');
router.get('/usuarios', usersController.usuarios);

module.exports = router;