
const conn = require('../db/config');

// async function getEmailLocal(){
//     return email = await localStorage.getItem('email');
// }

async function deleteFromList(req,res){
   

//Mostramos los valores en consola:
      

 

 
   
    // console.log(req.query.filmName);

   

    
    await conn.connect((err) => {
        try {
            

            console.log(" Eliminar pelicula!");
            conn.query(`delete   from  usersfilms where filmId="${req.query.filmName}"`,(err, respuesta) => {
                console.log(" Eliminado!");
          
                return res.send();
            });
        } catch (error) {
            console.log(error)
        }
        

            
            return res.send();
        });
  
    

   
}

module.exports = deleteFromList;