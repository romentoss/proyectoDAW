const express = require('express');
const cors = require('cors');



//Utilizar la configuración de dotenv
require('dotenv').config();




// Crear el servidor/app de express

const app = express();

//conexión bdd Mysql
// dbConnection();

//Directorio publico
app.use(express.static('public'));


//CORS middleware

app.use(cors());

//Lectura y parseo de body middleware

app.use(express.json());


//Rutas con middleware use

app.use('/api/auth', require('./controllers/controllerDb'));

app.use('/api/movies' , require('./controllers/controllerMovies'));



//Levantar la aplicación de express escuchar en un puerto

app.listen(process.env.DBPORT,()=>{
    console.log(`Server corriendo en puerto ${process.env.DBPORT}`);
});