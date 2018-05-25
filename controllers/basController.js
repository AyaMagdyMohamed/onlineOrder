var excludedAttributes = []
var includedModels = []
const excludedAttributesArr = function (arr) {
  console.log('excluded array', arr)
  excludedAttributes = arr
}

const assignIncludedModels = function (arr) {
  console.log('includedModels', arr)
  includedModels = arr
}

const findAllEntities = function (model) {
  return model.findAll({attributes: { exclude: excludedAttributes }, include: includedModels, subQuery: false }).then(
         result => {
           excludedAttributes = []
           includedModels = []
           result = JSON.stringify(result)
           result = JSON.parse(result)
           return result
         }).catch(err => {
           console.log('err', err)
           throw err
         })
}
const findAllWithCondition = function (model, condition, limitNo) {
  return model.findAll({where: condition, attributes: { exclude: excludedAttributes }, include: includedModels}).then(
      result => {
        excludedAttributes = []
        includedModels = []
        result = JSON.stringify(result)
        result = JSON.parse(result)
       // console.log(result)
        return result
      }).catch(err => {
        console.log('err', err)
        throw err
      })
}
const findAllEntitiesWithoutLimit = function (model) {
  return model.findAll({include: includedModels, subQuery: false}).then(
         result => {
           excludedAttributes = []
           includedModels = []
           result = JSON.stringify(result)
           result = JSON.parse(result)
           return result
         }).catch(err => {
           console.log('err', err)
           throw err
         })
}
const findByAttribute = function (model, condition) {
  console.log('excludedAttributes', excludedAttributes)
  return model.findOne({where: condition, attributes: { exclude: excludedAttributes }, include: includedModels}).then(result => {
    excludedAttributes = []
    includedModels = []
    result = JSON.stringify(result)
    result = JSON.parse(result)
    return result
  }).catch(err => {
    throw err
  })
}

const createNewEntity = function (model, entityToAdd) {
  //entityToAdd = JSON.parse(entityToAdd)
  //console.log("entity", entityToAdd.taskVersion)
  if(assignIncludedModels.length != 0){
    return model.create(entityToAdd, {include: includedModels}).then(data => { return data }).catch(err => {
      throw err
    })
  }
  else {
  return model.create(entityToAdd).then(data => { return data }).catch(err => {
    throw err
  })
}
}

function compareValues (key1, key2, order = 'asc') {
  return function (a, b) {
    const varA = a[key2] / a[key1]
    const varB = b[key2] / b[key1]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return (
        (order === 'desc')
        ? (comparison * -1) : comparison
    )
  }
}
const updateEntity = function (model, entity, condition) {
  return model.update(entity,
    {where: condition
    }).then(affectedNum => { return findByAttribute(model, condition) }).catch(err => { throw err })
}

const deleteEntity = function (model, condition) {
  return model.destroy({

    where: condition
  }).then(result => { return result }).catch(err => { throw err })
}

const findEntitiesWithLimit = function (model, limitNo) {
  return model.findAll({attributes: { exclude: excludedAttributes }, include: includedModels, limit: parseInt(limitNo), subQuery: false }).then(
         result => {
           excludedAttributes = []
           includedModels = []
           result = JSON.stringify(result)
           result = JSON.parse(result)
           return result
         }).catch(err => {
           console.log('err', err)
           throw err
         })
}

const findEntitiesWithQuery = function (model, query) {
  var queryObj = {include: includedModels, attributes: { exclude: excludedAttributes }, subQuery: false }
  Object.assign(queryObj, query)

  return model.findAll(queryObj).then(
         result => {
           // console.log(result)
           excludedAttributes = []
           includedModels = []
           result = JSON.stringify(result)
           result = JSON.parse(result)
           return result
         }).catch(err => {
           console.log('err', err)
           throw err
         })
}

module.exports = {

  findAllEntities: findAllEntities,
  findByAttribute: findByAttribute,
  excludedAttributesArr: excludedAttributesArr,
  assignIncludedModels: assignIncludedModels,
  createNewEntity: createNewEntity,
  updateEntity: updateEntity,
  deleteEntity: deleteEntity,
  findAllEntitiesWithoutLimit: findAllEntitiesWithoutLimit,
  findAllWithCondition: findAllWithCondition,
  findEntitiesWithLimit: findEntitiesWithLimit,
  findEntitiesWithQuery: findEntitiesWithQuery,
  compareValues: compareValues
}
