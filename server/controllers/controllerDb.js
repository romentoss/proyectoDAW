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

controller.listas =(req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query('select * from userslists inner join UsersFilmShared on userslists.UserOwnerId=UsersFilmShared.id  where  id=1', (err, userslists)=>{
            if(err){
                res.json(err);
            }else{
                console.log(userslists)
                res.render('index.ejs',{
                    data:userslists
                });
               
            }
        })
    })
}
controller.peliculas =(req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query('select * from UsersFilms inner join UsersLists on UsersFilms.ListOwnerId=UsersLists.ListId inner join UsersFilmShared on UsersLists.UserOwnerId=UsersFilmShared.id where id=1', (err, userfilms)=>{
            if(err){
                res.json(err);
            }else{
                console.log(userfilms)
                res.render('index.ejs',{
                    data:userfilms
                });
               
            }
        })
    })
}
controller.usuarios =(req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query('select * from UsersFilmShared  where id=1', (err, users)=>{
            if(err){
                res.json(err);
            }else{
                console.log(users)
                res.render('index.ejs',{
                    data:users
                });
               
            }
        })
    })
}

module.exports = controller;