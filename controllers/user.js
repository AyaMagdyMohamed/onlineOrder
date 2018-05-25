
const db = require('../dbConnection')
const Sequelize = require('sequelize')
const userModel = require('../models/user')
const profileModel = require('../models/profile')
var excludedAttributes = ['profile_id']
const findUserByUserName = function (name) {
  return userModel.findOne({where: { user_name: name },
    attributes: { exclude: excludedAttributes },
    include: [{
      model: profileModel,
      required: true
    }]}).then(user => {
      return user
    }).catch(err => { throw err })
}

const findAllUsers = function () {
  return userModel.findAll({ limit: 20,
    attributes: { exclude: excludedAttributes },
    include: [{
      model: profileModel
        // where: {user_name: 'TestUser2'}
    }]}).then(users => {
      return users
    }).catch(err => { throw err })
}

const findUserById = function (id) {
  return userModel.findOne({where: {user_id: id},
    attributes: { exclude: excludedAttributes },
    include: [{
      model: profileModel
          // where: {user_name: 'TestUser2'}
    }]}).then(user => {
      return user
    }).catch(err => { throw err })
}

const updateUserById = function (fieldsToChange, id) {
  return userModel.update({password: fieldsToChange.password,
    user_name: fieldsToChange.userName,
    profile_id: fieldsToChange.profileId},
    {where: { user_id: id}
    }).then(affectedNum => { return findUserById(id) }).catch(err => { throw err })
}

const addNewUser = function (fieldsToAdd) {
  return userModel.create({
    user_name: fieldsToAdd.userName,
    profile_id: fieldsToAdd.profileId,
    password: fieldsToAdd.password}).then(data => { return findUserById(data.user_id) }).catch(err => { throw err })
}
const deleteUserById = function (id) {
  return userModel.destroy({

    where: {

      user_id: id

    }
  }).then(result => { return result }).catch(err => { throw err })
}

module.exports = {
  findUserByUserName: findUserByUserName,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  updateUserById: updateUserById,
  addNewUser: addNewUser,
  deleteUserById: deleteUserById

}
