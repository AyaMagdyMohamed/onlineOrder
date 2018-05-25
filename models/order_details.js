const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')

const user = sequelize.define('orderDetail', {

  orderId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'order',
      key: 'order_id'
    },
    field: 'order_id'
  },

  productId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'product',
      key: 'product_id'
    },
    field: 'product_id'
  },
  quantity: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    field: 'quantity',
    defaultValue: 1
  }

}, {
    tableName: 'order_detail'

})

module.exports = user
