const express = require('express')
const router = express.Router()
const productModel = require('../models/product')
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
 * /api/Profile:
 *   get:
 *     tags:
 *       - profile
 *     description: Returns all profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of profiles
 *         schema:
 *             $ref: '#/definitions/Profile'
 */
router.route('/').get(function (req, resp) {
  baseRoute.getAll(req, resp, productModel)
})

 /**
 * @swagger
 * /api/Profile:
 *    post:
 *      tags:
 *       - profile
 *      description: Add new profile
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: profile
 *          in: body
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Profile'
 *      responses:
 *       200:
 *         description: Successfully created
 */
router.route('/').post(function (req, resp) {
  var newProduct = {
    productName: req.body.productName,
    productPrice: req.body.productPrice
  }

  baseRoute.addNewEntity(req, resp, profileModel, newProfile).then(data => {
    var condition = {profileId: data.profileId}
    baseRoute.getOneEntity(req, resp, profileModel, condition)
  }).catch(err => {
    WebErrors.BAD_REQUEST.developerMessage = err
    resp.status(httpStatus.BAD_REQUEST).send(WebErrors.BAD_REQUEST)
  })
})

/**
 * @swagger
 * /api/Profile:
 *   put:
 *     tags:
 *     - profile
 *     description: Updates a single Profile
 *     produces: application/json
 *     parameters:
 *      - name: body
 *        in: body
 *        description: Fields for the Profile resource
 *        schema:
 *          $ref: '#/definitions/Profile'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
// router.route('/').put(function (req, resp) {
//   var profileToUpdate = {

//     profileCode: req.body.profileCode,
//     profileDescription: req.body.profileDescription

//   }

//   var condition = {profileId: req.body.profileId}

//   baseRoute.updateNewEntity(req, resp, profileModel, profileToUpdate, condition)
// })

router.route('/').all(methodNotAllowedHandler)

/**
 * @swagger
 * /api/Profile/{id}:
 *   get:
 *     tags:
 *       - profile
 *     description: Returns a single profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: profile id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single profile
 *         schema:
 *           $ref: '#/definitions/Profile'
 */
// router.route('/:id').get(function (req, resp) {
//   var condition = {profileId: req.params.id}
//   baseRoute.getOneEntity(req, resp, profileModel, condition)
// })

/**
 * @swagger
 * /api/Profile/{id}:
 *   delete:
 *     tags:
 *       - profile
 *     description: Delete a single profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: profile id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         schema:
 *           $ref: '#/definitions/Profile'
 */
// router.route('/:id').delete(function (req, resp) {
//   profileController.deleteProfileById(req.params.id).then(
//     function (data) {
//       if (data) {
//         resp.send('Deleted Successfully')
//       } else {
//         resp.status(httpStatus.NOT_FOUND).send(AppErrors.entityNotFound)
//       }
//     }).catch(err => {
//       WebErrors.serverError.developerMessage = err

//       resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
//     })
// })

router.route('/:id').all(methodNotAllowedHandler)

module.exports = router
