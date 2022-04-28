const conn = require('../db/config');

//Función para añadir listas de usuario
async function addNewList(req,res){
    const name = req.body.name;
    const email = req.body.email;
    await conn.connect((err) => {
        try {
            conn.query(`INSERT INTO userslist ( listName,emailUser) VALUES ( "${name}" , "${email}");`,(err, respuesta) => {
                return res.send();
            });
        } catch (error) {
            console.log(error)
        }
            return res.send();
      }); 
}

module.exports = addNewList;