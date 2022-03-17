const controller = {}

controller.list =(req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query('select usersfilms.FilmId, usersfilms.ListOwnerId, usersfilms.filmAuxUrl,usersfilmshared.id, usersfilmshared.Pass_Word, userslists.ListId, userslists.ListName, userslists.UserOwnerId from usersfilmshared join userslists on usersfilmshared.id=userslists.UserOwnerId join usersfilms on userslists.ListId = usersfilms.ListOwnerId', (err, usersfilms)=>{
            if(err){
                res.json(err);
            }else{
                console.log(usersfilms)
                res.render('index.ejs',{
                    data:usersfilms
                });
            }
        })
    })
}



module.exports = controller;