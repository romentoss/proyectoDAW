
const conn = require('../db/config');

// async function getEmailLocal(){
//     return email = await localStorage.getItem('email');
// }

async function addNewList(req,res){

    // console.log(req.body);
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    

    await conn.connect((err) => {
        console.log(" Crear!");
        conn.query(`select * from userslist join usersfilms on userslist.listId= usersfilms.listOwner where emailUser="prueba1@prueba.com"`
         ,(err, respuesta) => {
            const output = []
            
            // Iterate res array and get all distinct listId
            respuesta.forEach( ({listId, listName, listOwner} ) => {
                if (!output.some(item => item.listId === listId)) {
                    output.push({
                            listId: listId,
                            listName: listName,
                            listOwner: listOwner
                    });
                }
            })
            
            respuesta.forEach( element => {
                output.forEach( item => {
                    if (element.listId === item.listId) {
                        item.films = item.films || [];
                        item.films.push({
                            filmId: element.filmId,
                            filmUrl: element.filmUrl,
                            filmName: element.filmName,
                            filmPhoto: element.filmPhoto,
                           
                        })
                    }
                })
            })

            
            return res.send({data:output});
        });
      }); 
}

module.exports=getListByUser;