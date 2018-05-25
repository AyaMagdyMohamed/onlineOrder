const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')

const user = sequelize.define('user', {

  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id'
  },
  userName: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    field: 'user_name'
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: true,
    field: 'password'
  },
  profileId: {
    type: Sequelize.INTEGER(11),
    defaultValue: 2,
    references: {
      model: 'profile',
      key: 'profile_id'
    },
    field: 'profile_id'
  }
}, {
  tableName: 'user'

})

module.exports = user
