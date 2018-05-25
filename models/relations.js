
const profile = require('./profile')
const user = require('./user')
const order = require('./order')
var db = require('../dbConnection')
module.exports = {

  profileModel: profile.hasMany(user, { foreignKey: 'profileId',
    onDelete: 'cascade',
    hooks: true}),

  userModel: user.belongsTo(profile, { foreignKey: 'profileId',
    onDelete: 'cascade',
    hooks: true}), 
  
  userWithOrders: user.hasMany(order, {
    foreignKey: 'userId'
  })
}
