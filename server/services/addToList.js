const conn = require('../db/config');

// Función para añadir películas a la base de datos. 
async function addToList(req,res){

    let url = "https://www.themoviedb.org/movie/";
    let urlPhoto ="https://image.tmdb.org/t/p/w500"
    const listOwner = req.body.listOwner;
    const filmName = req.body.pelicula.original_title;
    const filmPhoto = req.body.pelicula.backdrop_path;
    const idMd = req.body.pelicula.id;


    await conn.connect((err) => {
        try {
            console.log(" meter en lista!");
            conn.query(`INSERT INTO usersfilms (filmUrl, listOwner,filmName,filmPhoto,idMd  )
            VALUES ( "${url+idMd}", ${listOwner}, "${filmName}", "${urlPhoto+filmPhoto}", ${idMd});`,(err, respuesta) => {   
                return res.send();
            });
        } catch (error) {
            console.log(error)
        }    
            return res.send();
        });
};

module.exports = addToList;