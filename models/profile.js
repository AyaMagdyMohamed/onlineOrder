const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')

const Profile = sequelize.define('profile', {
  profileId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'profile_id'
  },
  profileCode: {
    type: Sequelize.STRING(10),
    allowNull: false,
    field: 'profile_code'
  },
  profileDescription: {
    type: Sequelize.STRING(45),
    allowNull: true,
    field: 'profile_description'
  }
},
  {

    tableName: 'profile'

  })

module.exports = Profile
