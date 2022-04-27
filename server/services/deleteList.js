
const conn = require('../db/config');

// async function getEmailLocal(){
//     return email = await localStorage.getItem('email');
// }

async function deleteList(req,res){
   

//Mostramos los valores en consola:
      

 

 
    const {nameList} =req.query.listName;
    console.log(req.query.listName);
    console.log(nameList);

   

    
    await conn.connect((err) => {
        try {
            

            console.log(" Eliminar!");
            conn.query(`DELETE FROM userslist WHERE listName='${req.query.listName}';`,(err, respuesta) => {
                console.log(" Eliminado!");
          
                return res.send();
            });
        } catch (error) {
            console.log(error)
        }
        

            
            return res.send();
        });
  
    

   
}

module.exports = deleteList;