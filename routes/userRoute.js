const express = require('express')
const router = express.Router()
const baseController = require('../controllers/basController')
const userModel = require('../models/user')
const orderModel = require('../models/order')
const profileModel = require('../models/profile')
const baseRoute = require('./baseRouter')
const httpStatus = require('http-status')
const bcrypt = require('bcrypt')
var WebErrors = require('../public/ErrorMessages/WebErrors')
var AppErrors = require('../public/ErrorMessages/AppErrors')
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

function assignConditions () {
  baseController.excludedAttributesArr(['profileId', 'password'])
  baseController.assignIncludedModels([{
    model: orderModel
  }])
}

function methodNotAllowedHandler (req, resp) {
  resp.status(httpStatus.METHOD_NOT_ALLOWED).send(WebErrors.notAllowed)
}


 /**
 * @swagger
 * /api/User:
 *    post:
 *      tags:
 *       - user
 *      description: Add new user
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: user
 *          in: body
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *       200:
 *         description: Successfully created
 */
router.post('/signup', function (req, resp) {
  const saltRounds = 12
  var hashedPass
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    console.log(hash)
    hashedPass = hash
    var newUser = {

      password: hashedPass,
      userName: req.body.username
    }

    baseRoute.addNewEntity(req, resp, userModel, newUser).then(data => {
      var condition = {userId: data.userId}
      baseController.assignIncludedModels({model: profileModel})
      baseRoute.getOneEntity(req, resp, userModel, condition)
    }).catch(err => {
      WebErrors.BAD_REQUEST.developerMessage = err
      resp.status(httpStatus.BAD_REQUEST).send(WebErrors.BAD_REQUEST)
    })
  })
})

router.route('/signup').all(methodNotAllowedHandler)
/**
 * @swagger
 * /api/User/{id}:
 *   get:
 *     tags:
 *       - user
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.route('/').get(function (req, resp) {
  console.log(req.decoded.iss)
  var id = req.decoded.iss 
  assignConditions()
  var condition = {userId: id}
  baseRoute.getOneEntity(req, resp, userModel, condition)
})


router.route('/').all(methodNotAllowedHandler)

module.exports = router
