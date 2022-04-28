const conn = require('../db/config');

async function getListByUser(req,res){
    const { email } = req.user;
    await conn.connect((err) => {
        conn.query(`select * from userslist left join usersfilms on userslist.listId= usersfilms.listOwner where emailUser="${email}"`
         ,(err, respuesta) => {
            const output = []
            console.log(respuesta);
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
            console.log("1",output);
            
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
            console.log("2",output);
            // console.log("omg", output[0])
            return res.send({data:output});
        });
      }); 
}

module.exports=getListByUser;