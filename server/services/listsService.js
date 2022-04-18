
const conn = require('../db/config');

// async function getEmailLocal(){
//     return email = await localStorage.getItem('email');
// }

async function getListByUser(req,res){

    // console.log(req.body);
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    

    await conn.connect((err) => {
        // console.log("Listas!");
        conn.query(`select * from userslist join usersfilms on userslist.listId= usersfilms.listOwner where emailUser="prueba1@prueba.com"`
         ,(err, respuesta) => {
            const output = []
            // console.log(respuesta);
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
                            filmIdMD:element.idMd
                           
                        })
                    }
                })
            })

            // console.log("omg", output[0])
            return res.send({data:output});
        });
      }); 
}

module.exports=getListByUser;