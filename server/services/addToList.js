const conn = require('../db/config');


// async function getEmailLocal(){
//     return email = await localStorage.getItem('email');
// }

async function addToList(req,res){
//Mostramos los valores en consola:
 
    console.log(req.body.listOwner);
    console.log(req.body.pelicula);

    console.log(req.body);

    let url = "https://www.themoviedb.org/movie/";
    let urlPhoto ="https://image.tmdb.org/t/p/w500"
    const listOwner = req.body.listOwner;
    const filmUrl = req.body.pelicula.filmUrl;
    const filmName = req.body.pelicula.original_title;
    const filmPhoto = req.body.pelicula.backdrop_path;
    const idMd = req.body.pelicula.id;

    console.log(req.body.pelicula.id,req.body.pelicula.id);

    console.log(listOwner,url+idMd,filmName,urlPhoto+filmPhoto,idMd);


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