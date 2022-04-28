const mysql = require('mysql2');
//configuración de datos para las peticiones a la base de datos, los datos los alojamos en el .env
const conn =mysql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    port:process.env.BDPORT,
    database:process.env.DBDATABASE

});

console.log('DB online');
module.exports = conn;