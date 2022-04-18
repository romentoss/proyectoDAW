const mysql = require('mysql2');

const conn =mysql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    port:process.env.BDPORT,
    database:process.env.DBDATABASE

});

console.log('DB online');
module.exports = conn;