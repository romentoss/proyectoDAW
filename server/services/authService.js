const jwt = require("jsonwebtoken");
const { unsubscribe } = require("../controllers/controllerDb");

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
