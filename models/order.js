const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')

const user = sequelize.define('order', {

  orderId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'order_id'
  },
  orderPrice: {
    type: Sequelize.DOUBLE(30),
    allowNull: true,
    field: 'order_price'
  },
  orderDate: {
    type: Sequelize.DATE,
    allowNull: true,
    field: 'order_price'
  },
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_id'
    },
    field: 'user_id'
  }
}, {
  freezeTableName: true

})

module.exports = user
