const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var config = require('../config.js')
const checkPassword = function (password, dbPassword) {
  if (bcrypt.compareSync(password, dbPassword)) {
    return true
  } else {
        // Passwords don't match
    return false
  }
}
var generateAccessToken = function (id) {
  var secret = config.secret
  // console.log('secret1', secret)
  var payload = {

    // 'exp': config.time,
    'iss': id,
    'sub': config.appId

  }
  var token = jwt.sign(payload, secret, { expiresIn: config.time })
  return token
}
module.exports =
{
  checkPassword: checkPassword,
  generateAccessToken: generateAccessToken
}
