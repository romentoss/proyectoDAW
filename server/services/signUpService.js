const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
const conn = require('../db/config');
const { json } = require('express/lib/response');
const jwt = require('jsonwebtoken');
 



async function signUp(req,res){

    console.log(req.body);
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