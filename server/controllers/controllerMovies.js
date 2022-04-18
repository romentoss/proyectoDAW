const { Router } = require('express');
const router = Router();

const getListByUser = require('./../services/listsService');
const verifyToken = require('../services/authService');



router.get('/lists',verifyToken,getListByUser);



module.exports=router;
