const { Router } = require('express');
const router = Router();

const signUp = require('../services/signUpService');
const login = require('../services/loginService');

 
router.post('/signup', signUp);
router.post('/login',login);



module.exports = router;


