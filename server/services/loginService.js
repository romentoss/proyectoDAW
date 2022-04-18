const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
const conn = require('../db/config');
const { json } = require('express/lib/response');
const jwt = require('jsonwebtoken');

async function login(req,res){

    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    
    jwt.sign({email}, 'secretkey',{expiresIn:30} , async(err,token) =>{
        await conn.connect((err) => {
            console.log("Login!");
            conn.query(`select * from usersfilmshared Where email='${email}' and password='${password}'`
            ,(err, respuesta) => {
             
              if (err){
                throw err;
              } else{
                const decode = jwt.verify(token, "secretkey");
                return res.send(
                    !respuesta[0] ? 
                    {
                        userlogged:false,
                        jwt:undefined,
                        name:undefined
        
                    }  :
                    {
                        userlogged:true,
                        jwt:token,
                        name:respuesta[0].name,
                        data:decode
                    }  
                );
              }
              
            
              
             
              
             
            });
          }); 
      
    });


    
}

module.exports = login;