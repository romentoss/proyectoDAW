
const conn = require('../db/config');

//Función para eliminar peliculas de una lista, en este caso le pasamos el id de la pelicula el cual es 
// diferente en todas las listas por tanto no se eliminan las peliculas que sean iguales de otras listas
async function deleteFromList(req,res){
    await conn.connect((err) => {
        try {
            conn.query(`delete from usersfilms where filmId="${req.query.filmName}"`,(err, respuesta) => {
             return res.send();
            });
        } catch (error) {
            console.log(error)
        }    
            return res.send();
        });
}

module.exports = deleteFromList;