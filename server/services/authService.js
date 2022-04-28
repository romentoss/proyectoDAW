const jwt = require("jsonwebtoken");

// Función para realizar la verificación del token en caso de error enviamos un 403
// en otro caso descodificamos el jwt para igualarlo al req.user. 
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  try {
    const decode = jwt.verify(bearerHeader, "secretkey");
    req.user = decode.user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
