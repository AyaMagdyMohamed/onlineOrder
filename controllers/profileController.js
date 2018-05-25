
const profileModel = require('../models/profile')
const userModel = require('../models/user')
const sequelize = require('../dbConnection.js')

const deleteProfileById = function (id) {
  return sequelize.transaction(function (t) {
    return userModel.destroy({
      where: {
        profileId: id
      },
      transaction: t
    }).then(function (user) {
      return profileModel.destroy({
        where: {
          profileId: id
        },
        transaction: t
      })
    })
  }).then(function (result) {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
  }).catch(function (err) {
    // console.log('error', err)
    return err
  })
}

module.exports = {
  deleteProfileById: deleteProfileById
}
