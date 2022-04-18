const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){

    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    
       try {
            const decode = jwt.verify(bearerHeader, "secretkey");
            console.log(decode);
            next();
       } catch (error) {
            res.sendStatus(403);
       }
        
   
       
    
        
    
}

module.exports = verifyToken;