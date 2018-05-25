
const express = require('express')
// const router = express.Router()
var config = require('../config.js')
var jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
var ErrorMessages = require('../public/ErrorMessages/WebErrors')
module.exports = function (req, res, next) {
    // check header or url parameters or post parameters for token
  var token = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'

    // decode token
  if (token) {
      // verifies secret and checks exp
    console.log(req.headers.authorization.split(' ')[1])
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decoded) {
      if (err) {
        ErrorMessages.unauthorized.developerMessage = err
        res.status(httpStatus.UNAUTHORIZED).send(ErrorMessages.unauthorized)
      } else {
          // if everything is good, save to request for use in other routes
        req.decoded = decoded
        return next()
      }
    })
  } else {
      // if there is no token
      // return an error
      // console.log("error is ")
    res.status(httpStatus.UNAUTHORIZED).send(ErrorMessages.unauthorization)
  }
}
