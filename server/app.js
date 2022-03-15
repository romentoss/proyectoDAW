const express = require('express');

const app = express();
const routes = require('./routes/routes.js');
//Vamos a configurar un puerto y va a escuchar en el definido y si no tiene escucha en el 3000
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(routes);
//Iniciamos la conexión
app.listen(app.get('port'), ()=>{
    console.log('Server on port '+app.get('port'));

});



app.use(routes);