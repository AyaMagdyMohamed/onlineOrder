const express = require('express')
const router = express.Router()
const profileModel = require('../models/profile')
const userModel = require('../models/user')
const orderModel = require('../models/order')
const orderDetail = require('../models/order_details')
const productModel = require('../models/product')
const baseRoute = require('./baseRouter')
const httpStatus = require('http-status')
const baseController = require('../controllers/basController')
var AppErrors = require('../public/ErrorMessages/AppErrors')
var WebErrors = require('../public/ErrorMessages/WebErrors')
var bodyParser = require('body-parser')
const sequelize = require('../dbConnection.js')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

function methodNotAllowedHandler (req, resp) {
  resp.status(httpStatus.METHOD_NOT_ALLOWED).send(WebErrors.notAllowed)
}
 
 /**
 * @swagger
 * /api/order:
 *    post:
 *      tags:
 *       - order
 *      description: Add new order
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: products
 *          in: body
 *          required: true
 *          schema:
 *            $ref: '#/definitions/products'
 *      responses:
 *       200:
 *         description: Successfully created
 */
router.route('/').post(async function (req, resp) {
    var outer = this
    var products = req.body.products
    var id = req.decoded.iss 
    var condition = {userId: id}
    var date = new Date()
     outer.orderPrice = 0;
    for(var i=0; i<products.length;i++){
      //  orderPrice = orderPrice + 
        var self = this
        self.i = i 
        console.log("products[i].productName", products[i].productName)
      await baseController.findByAttribute(productModel, {productName: products[i].productName}).then(data=>{
       console.log("price",typeof data.productPrice)
       console.log("quantity", typeof products[self.i].quantity)
       var quantity =  parseFloat(products[self.i].quantity)
      
       var price = data.productPrice
       var total = quantity  * price
       console.log("total", total)
       outer.orderPrice += total 
        

      })
    }

    console.log("orderPrice", outer.orderPrice)
    var newOrder = {orderDate:date , userId: id, orderPrice: outer.orderPrice}
    baseController.assignIncludedModels([{model: profileModel}])
    baseController.findByAttribute(userModel, condition).then(userFound=>{
        if (userFound.profile.profileCode == 'User'){
            sequelize.transaction().then(function (t) {
                return orderModel.create(newOrder).then(createdOrder => {
                    createdOrder = JSON.stringify(createdOrder)
                    createdOrder = JSON.parse(createdOrder)
                 // console.log(taskResponse)
            
               

                resp.send(createdOrder)
            })
        })
        }
        else{

            resp.status(httpStatus.BAD_REQUEST).send(AppErrors.addOrder)
        }
    })
   
})

module.exports = router