const { Router } = require("express");
const router = Router();
const Usuario = require("../models/Usuario");
const conn = require("../db/config");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;
  const payload = { user: { email, password } };

  jwt.sign(
    payload,
    "secretkey",
    { expiresIn: 24 * 60 * 60 },
    async (err, token) => {
      // console.log(payload)
      await conn.connect((err) => {
        // console.log("Login!");
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
