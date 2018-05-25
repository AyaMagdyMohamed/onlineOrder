
const baseController = require('../controllers/basController')
const httpStatus = require('http-status')
var WebErrors = require('../public/ErrorMessages/WebErrors')
const cleanDeep = require('clean-deep')
const Sequelize = require('sequelize')
const decamelize = require('decamelize')
const Op = Sequelize.Op
function getAll (req, resp, model) {
  baseController.findAllEntities(model).then(result => {
    if (result) {
      var jsonString = JSON.stringify(result)
      var obj = JSON.parse(jsonString)
      resp.send(cleanDeep(obj, {emptyArrays: false}))
    } else {
      resp.status(httpStatus.NO_CONTENT).send('NO_CONTENT')
    }
  }).catch(err => {
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}
function getAllWithCondition (req, resp, model, condition) {
  baseController.findAllWithCondition(model, condition).then(result => {
    if (result) {
      resp.send(cleanDeep(result))
    } else {
      resp.status(httpStatus.NO_CONTENT).send('NO_CONTENT')
    }
  }).catch(err => {
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}
function getAllWithoutLimit (req, resp, model) {
  baseController.findAllEntitiesWithoutLimit(model).then(result => {
    if (result) {
     // resp.send(clearNullFields(result))
      var jsonString = JSON.stringify(result)
      var obj = JSON.parse(jsonString)
      result = cleanDeep(obj, {emptyArrays: false})
     // result = convertKeys(result)
      resp.send(result)
    } else {
      resp.status(httpStatus.NO_CONTENT).send('NO_CONTENT')
    }
  }).catch(err => {
    console.log(err)
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}

function getOneEntity (req, resp, model, condition) {
  baseController.findByAttribute(model, condition).then(result => {
    if (result) {
      resp.send(result)
    } else {
      resp.status(httpStatus.NO_CONTENT).send('NO_CONTENT')
    }
  }).catch(err => {
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}

function addNewEntity (req, resp, model, entity) {
  return baseController.createNewEntity(model, entity).catch(err => { throw err })
}

function updateNewEntity (req, resp, model, entity, condition) {
  baseController.updateEntity(model, entity, condition).then(result => {
    if (result) {
      resp.json('Successfully updated')
    } else {
      addNewEntity(req, resp, model, entity).then(result => resp.json('Successfully updated')).catch(err => {
        WebErrors.notFound.developerMessage = err
        resp.status(httpStatus.NOT_FOUND).send(WebErrors.notFound)
      })
    }
  }).catch(err => {
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}

function deleteEntity (req, resp, model, condition) {
  baseController.deleteEntity(model, condition).then(function (data) {
    if (data) {
      resp.send('Deleted Successfully')
    } else {
      WebErrors.notFound.developerMessage = data
      resp.status(httpStatus.NOT_FOUND).send(WebErrors.notFound)
    }
  }).catch(err => {
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}

function getEnitiesWithLimit (req, resp, model, limitNo) {
  baseController.findEntitiesWithLimit(model, limitNo).then(result => {
    if (result) {
      var jsonString = JSON.stringify(result)
      var obj = JSON.parse(jsonString)
      result = cleanDeep(obj, {emptyArrays: false})
   // result = convertKeys(result)
      resp.send(result)
    } else {
      resp.status(httpStatus.NO_CONTENT).send('NO_CONTENT')
    }
  }).catch(err => {
    console.log(err)
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}

function getEnitiesWithfullQuery (req, resp, model, query) {
  baseController.findEntitiesWithQuery(model, query).then(result => {
    if (result) {
      var jsonString = JSON.stringify(result)
      var obj = JSON.parse(jsonString)
      result = cleanDeep(obj, {emptyArrays: false})
   // result = convertKeys(result)
      resp.send(result)
    } else {
      resp.status(httpStatus.NO_CONTENT).send('NO_CONTENT')
    }
  }).catch(err => {
   // console.log(err)
    WebErrors.serverError.developerMessage = err

    resp.status(httpStatus.INTERNAL_SERVER_ERROR).send(WebErrors.serverError)
  })
}

function getQuery (queryString) {
  // console.log(queryString.limit)
  var appendedObj = {}
  appendedObj.order = []
  var orderObj = {order: []}
  var isAny = false
  var whereCondition = {}
  var limitFlag = false
  Object.keys(queryString).forEach(element => {
    var str = element
    if (Array.isArray(queryString[element])) {
      queryString[element] = queryString[element][0]
    }
    if (element.startsWith('limit')) {
      // appendedObj.limit = parseInt(queryString.limit)
      limitFlag = true
    } else if (element.startsWith('offset')) {
      appendedObj.offset = parseInt(queryString.offset)
    } else if (element.startsWith('sort')) {
      var sortValues = queryString.sort.split(',')
      sortValues.forEach(item => {
        item = item.trim()
        if (item.includes('id.')) {
          item = item.replace('id.', '')
        }
        if (item.startsWith('-')) {
          orderObj.order.push([item.substring('1'), 'DESC'])
        } else {
          orderObj.order.push([item, 'ASC'])
        }
      })
      appendedObj.order = orderObj.order
    } else if (element.startsWith('find')) {
      var res = 'any'.valueOf()
      var res2 = queryString.find.valueOf()
      isAny = (res === res2)
    } else {
      if (element.includes('.') && !(element.includes('id.'))) {
        str = '$' + decamelize(element) + '$'
       // whereCondition[str] = queryString[element]
      } else if (element.includes('.') && (element.includes('id.') && !element.startsWith('id.'))) {
        var strWithRemovedId = element.replace('id.', '')
        str = '$' + decamelize(strWithRemovedId) + '$'
       // whereCondition[str] = queryString[element]
      } else if (element.startsWith('id.')) {
        str = element.substring(3)

       // whereCondition[subStr] = queryString[element]
      }
      console.log(queryString[element].toString())
      if (queryString[element].toString().startsWith('like:')) {
        whereCondition[str] = {[Op.like]: '%' + queryString[element].substring(5) + '%'}
      } else if (queryString[element].toString().includes('%')) {
        whereCondition[str] = queryString[element].toLowerCase()
      } else if (queryString[element].toString().startsWith('lte:')) {
        console.log('trueeeeeeeeeeeeee', str)
        whereCondition[str] = { [Op.lte]: queryString[element].substring(4) }
      } else if (queryString[element].toString().startsWith('lt:')) {
        whereCondition[str] = { [Op.lt]: queryString[element].substring(3) }
      } else if (queryString[element].toString().startsWith('gte:')) {
        whereCondition[str] = { [Op.gte]: queryString[element].substring(4) }
      } else if (queryString[element].toString().startsWith('gt:')) {
        whereCondition[str] = { [Op.gt]: queryString[element].substring(3) }
      } else if (queryString[element].toString().startsWith('btw:')) {
        var betweenSplit = queryString[element].split(',')
        whereCondition[str] = { [Op.between]: [betweenSplit[0], betweenSplit[1]] }
      } else if (queryString[element].toString().startsWith('null')) {
        whereCondition[str] = null
      } else {
        whereCondition[str] = queryString[element]
      }
    }
  })
  if (isAny) {
    var orObject = {[Op.or]: []}
    for (var key in whereCondition) {
      if (whereCondition.hasOwnProperty(key)) {
        orObject[Op.or].push({[key]: whereCondition[key]})
      }
    }
    appendedObj.where = orObject
  } else {
    appendedObj.where = whereCondition
  }
  if (limitFlag) {
    Object.assign(appendedObj, { limit: parseInt(queryString.limit) })
  } else {
    Object.assign(appendedObj, { limit: 20 })
  }
   // appendedObj.limit = parseInt(queryString.limit)
  return appendedObj
}
module.exports = {

  getAll: getAll,
  getOneEntity: getOneEntity,
  addNewEntity: addNewEntity,
  updateNewEntity: updateNewEntity,
  deleteEntity: deleteEntity,
  getAllWithoutLimit: getAllWithoutLimit,
  getAllWithCondition: getAllWithCondition,
  getEnitiesWithLimit: getEnitiesWithLimit,
  getQuery: getQuery,
  getEnitiesWithfullQuery: getEnitiesWithfullQuery
}
