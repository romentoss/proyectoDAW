const conn = require('../db/config');

 


//Función encargada del registro requerimos los datos necesarios y los insertamos en la tabla, si hay algun error 
// los datos seran false y undefined y si funciona todo como deberia, nos redijira al login donde ya podremos logearnos 
//y obtener nuestro token
async function signUp(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    await conn.connect((err) => {
        console.log("Register!");
        conn.query(`INSERT INTO usersfilmshared (name, email, password) VALUES ('${name}','${email}','${password}')`
         ,(err, respuesta) => { 
            return res.send(
                err ? 
                {
                    userlogged:false,
                    jwt:undefined,
                    name:undefined

                }  :
                {
                    userlogged:true,
                    jwt:'JWT',
                    name:name
                }  
            );
        });
      }); 
}



module.exports=signUp;