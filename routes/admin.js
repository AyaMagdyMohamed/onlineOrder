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
 * /api/admin:
 *   get:
 *     tags:
 *       - user
 *     description: Returns all users with there orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *             $ref: '#/definitions/users'
 */
router.get('/', function (req, resp) {
    
        var id = req.decoded.iss
       var condition = {userId: id}
       baseController.assignIncludedModels([{model: profileModel}])
       baseController.findAllWithCondition(userModel, condition).then(data=>{
           console.log("dta", data)
          if(data[0].profile.profileCode  == 'ADM'){
    
           assignConditions()
           baseRoute.getAll(req, resp, userModel)
           
          }
   
          else{
    
           resp.status(httpStatus.BAD_REQUEST).send(AppErrors.notAllowed)
   
          }
   
       })
      
     
   })

router.route('/').all(methodNotAllowedHandler)
 
   module.exports = router
