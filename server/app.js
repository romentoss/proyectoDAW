const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection')
const app = express();
//importing routes
const customerRoutes = require('./routes/routes');
const { urlencoded } = require('express');
//settings
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql ,{
    host:'localhost',
    user:'root',
    password:'contrasena',
    port:3306,
    database:'filmshared'
},'single'));
//nos permite entender datos del form
app.use(express.urlencoded({
    extended:false
}));
//routes
app.use('/',customerRoutes);

//Statics files(para imagenes para json las cosas de public )
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'), ()=>{
    console.log("Server on port 3000");
})