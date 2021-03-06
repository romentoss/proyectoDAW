const express = require('express');
const cors = require('cors');


let bodyParser = require('body-parser');



//Utilizar la configuración de dotenv
require('dotenv').config();




// Crear el servidor/app de express

const app = express();

//conexión bdd Mysql

//Directorio publico
app.use(express.static('public'));


//CORS middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Lectura y parseo de body middleware

app.use(express.json());


//Rutas con middleware use

app.use('/api/auth', require('./controllers/controllerDb'));

app.use('/api/movies' , require('./controllers/controllerMovies'));

//Manejar demas rutas
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public/index.html'));
}
);



//Levantar la aplicación de express escuchar en un puerto

app.listen(process.env.DBPORT,()=>{
    console.log(`Server corriendo en puerto ${process.env.DBPORT}`);
});