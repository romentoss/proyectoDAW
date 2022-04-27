
const { header } = require('express/lib/response');
const conn = require('../db/config');

// async function getEmailLocal(){
//     return email = await localStorage.getItem('email');
// }

async function addNewList(req,res){

    console.log("hola en server"+req.body.name);

    const name = req.body.name;
    const email = req.body.email;
    

    console.log("email"+req.body.email);
    // const email = req.body.email;
    // const password = req.body.password;
    
  

    await conn.connect((err) => {

        try {
            console.log(" Crear!");
            conn.query(`INSERT INTO userslist ( listName,emailUser) VALUES ( "${name}" , "${email}");`,(err, respuesta) => {
                return res.send();
            });
        } catch (error) {
            console.log(error)
        }
        
    //
    //      ,(err, respuesta) => {
    //         const output = []
            
    //         // Iterate res array and get all distinct listId
    //         respuesta.forEach( ({listId, listName, listOwner} ) => {
    //             if (!output.some(item => item.listId === listId)) {
    //                 output.push({
    //                         listId: listId,
    //                         listName: listName,
    //                         listOwner: listOwner
    //                 });
    //             }
    //         })
            
    //         respuesta.forEach( element => {
    //             output.forEach( item => {
    //                 if (element.listId === item.listId) {
    //                     item.films = item.films || [];
    //                     item.films.push({
    //                         filmId: element.filmId,
    //                         filmUrl: element.filmUrl,
    //                         filmName: element.filmName,
    //                         filmPhoto: element.filmPhoto,
                           
    //                     })
    //                 }
    //             })
    //         })

            
            return res.send();
    //     });
      }); 
}

module.exports = addNewList;