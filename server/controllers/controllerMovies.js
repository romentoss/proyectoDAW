
const  express  = require('express');
const app = express();

// const router = express.Router();


const getListByUser = require('./../services/listsService');
const verifyToken = require('../services/authService');
const addNewList = require('../services/addNewList');
const deleteList = require('../services/deleteList');
const addToList = require('../services/addToList');
const deleteFromList = require('../services/deleteFromlist');

//En este controlador llamamos a realizar todas las acciones que no tienen que ver con el logeo del usuario. 
app.get('/lists',verifyToken,getListByUser);
app.delete('/deleteList', deleteList);
app.post('/addNewFilm',addToList);
app.post('/addNewList',addNewList);
app.delete('/deleteFromList', deleteFromList);



module.exports=app;
