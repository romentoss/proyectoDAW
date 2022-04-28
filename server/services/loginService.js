
const conn = require("../db/config");
const jwt = require("jsonwebtoken");

// Función encargada de logearnos y darnos el token, firmamos el token con el payload y le ponemos un tiempo de 
// limite luego hacemos la petición a la base de datos con los datos de email ycontraseña correspondientes
// hacemos un decode del token y lo enviamos en la respuesta como un objeto, en caso de fallar o si el user no esta 
// logeado, los datos vendrán como undefined. 
async function login(req, res) {
  const { email, password } = req.body;
  const payload = { user: { email, password } };
  jwt.sign(
    payload,
    "secretkey",
    { expiresIn: 24 * 60 * 60 },
    async (err, token) => {
      await conn.connect((err) => {
        conn.query(
          `select * from usersfilmshared Where email='${payload.user.email}' and password='${payload.user.password}'`,
          (err, respuesta) => {
            if (err) {
              throw err;
            } else {
              const decode = jwt.verify(token, "secretkey");
              return res.send(
                !respuesta[0]
                  ? {
                      userlogged: false,
                      jwt: undefined,
                      name: undefined,
                    }
                  : {
                      userlogged: true,
                      jwt: token,
                      name: respuesta[0].name,
                      data: decode,
                    }
              );
            }
          }
        );
      });
    }
  );
}

module.exports = login;
