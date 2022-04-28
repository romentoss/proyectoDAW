
const conn = require('../db/config');

// Función para eliminar las listas por nombre lo que quiere decir que todas las lista deverian tener un nombre diferente
// ya que no tiene utilidad archivar por el mismo nombre de lista. 
async function deleteList(req,res){
    await conn.connect((err) => {
        try {           
            conn.query(`DELETE FROM userslist WHERE listName='${req.query.listName}';`,(err, respuesta) => {
                return res.send();
            });
        } catch (error) {
            console.log(error)
        }   
            return res.send();
        }); 
}

module.exports = deleteList;