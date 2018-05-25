const express = require('express')
const router = express.Router()
const productModel = require('../models/product')
const profileModel = require('../models/profile')
const userModel = require('../models/user')
const baseController = require('../controllers/basController')
const baseRoute = require('./baseRouter')
const httpStatus = require('http-status')
var AppErrors = require('../public/ErrorMessages/AppErrors')
var WebErrors = require('../public/ErrorMessages/WebErrors')
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

function methodNotAllowedHandler (req, resp) {
  resp.status(httpStatus.METHOD_NOT_ALLOWED).send(WebErrors.notAllowed)
}
 /**
 * @swagger
 * /api/product:
 *   get:
 *     tags:
 *       - product
 *     description: Returns all products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of products
 *         schema:
 *             $ref: '#/definitions/products'
 */
router.route('/').get(function (req, resp) {
  baseRoute.getAll(req, resp, productModel)
})

 /**
 * @swagger
 * /api/product:
 *    post:
 *      tags:
 *       - product
 *      description: Add new product
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: product
 *          in: body
 *          required: true
 *          schema:
 *            $ref: '#/definitions/product'
 *      responses:
 *       200:
 *         description: Successfully created
 */
router.route('/').post(function (req, resp) {
  var id = req.decoded.iss 
  var condition = {userId: id}

  var newProduct = {
    productName: req.body.productName,
    productPrice: req.body.productPrice
  }
  baseController.assignIncludedModels([{model: profileModel}])
  baseController.findByAttribute(userModel, condition).then(userFound=>{
    
    if(userFound.profile.profileCode == 'ADM'){
       

      baseRoute.addNewEntity(req, resp, productModel, newProduct).then(data => {
        var condition = {productId: data.productId}
        baseRoute.getOneEntity(req, resp, productModel, condition)
      }).catch(err => {
        WebErrors.BAD_REQUEST.developerMessage = err
        resp.status(httpStatus.BAD_REQUEST).send(WebErrors.BAD_REQUEST)
      })
    }

    else {
      resp.status(httpStatus.BAD_REQUEST).send(AppErrors.addProduct)

    }


  })
})

router.route('/').all(methodNotAllowedHandler)

module.exports = router
