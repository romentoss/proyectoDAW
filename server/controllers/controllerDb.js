const { Router } = require('express');
const router = Router();
const signUp = require('../services/signUpService');
const login = require('../services/loginService');

//En este controller realizamos las llamadas de la parte del logeo y el registro.
router.post('/signup', signUp);
router.post('/login',login);

module.exports = router;


