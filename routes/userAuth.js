const express = require('express')
const httpStatus = require('http-status')
const router = express.Router()
var bodyParser = require('body-parser')
const userController = require('../controllers/user')
const config = require('.././config')
const relations = require('../models/relations')
// var middleToParseRequestBody = bodyParser.urlencoded({extended: true})
var authenticateUser = require('../security/authenticateUser.js')
var WebErrors = require('../public/ErrorMessages/WebErrors')
var appErrors = require('../public/ErrorMessages/AppErrors')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

/**
 * @swagger
 * /api/authentication/login:
 *    post:
 *      tags:
 *       - authentication
 *      description: login
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          required: false
 *          schema:
 *            $ref: '#/definitions/Credentials'
 *      responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: "#/definitions/AccessToken"
 *       401:
 *         description: unauthorized user
 *       409:
 *         description: no active user territories 
 *       410:
 *         description: no user companies 
 */
router.route('/login').post(function (req, resp) {
  console.log(req.body.username)

  var result = ''

  if (req.body.username == '' || req.body.password == '') {
    resp.status(httpStatus.UNAUTHORIZED).send(WebErrors.unauthorized)
  } else {
    userController.findUserByUserName(req.body.username).then(function (data) {
      data = JSON.stringify(data)
      data = JSON.parse(data)
      // resp.send(data)
      result = data
      if (result == null) {
        resp.status(httpStatus.UNAUTHORIZED).send(WebErrors.unauthorized)
      } else {
        //  console.log(typeof (req.body.password))
       // console.log(data[0].password)
        var flag = authenticateUser.checkPassword(req.body.password, result.password)
        if (flag) {
                  var token = authenticateUser.generateAccessToken(data.userId)
                  var objResult = {
                    accessToken: token,
                    accessTokenType: 'Bearer',
                    user: data
                  }
                 // Object.assign(objResult, WebErrors.succuess)

                  resp.send(objResult)
             
            
        } else {
          resp.status(httpStatus.UNAUTHORIZED).send(WebErrors.unauthorized)
        }
      }
    }).catch(err => {
      console.log(err)
      WebErrors.serverError.developerMessage = err

      resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
    })
  }
}).all(methodNotAllowedHandler)

function methodNotAllowedHandler (req, resp) {
  resp.status(httpStatus.METHOD_NOT_ALLOWED).send(WebErrors.notAllowed)
}

module.exports = router
