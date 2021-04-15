const expressJwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const config = require("./config");

const jwtCheck = expressJwt({
  secret: config.secret,
  algorithms: ["HS256"],
});

function createToken(username, id) {
  return jsonwebtoken.sign({ username: username, id: id }, config.secret, {
    expiresIn: 60 * 60 * 5,
  });
}

module.exports = {
  jwtCheck,
  createToken,
};
