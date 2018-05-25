const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')

const product = sequelize.define('product', {

  productId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'product_id'
  },
  productName: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    field: 'product_name'
  },
  productPrice: {
    type: Sequelize.DOUBLE(30),
    allowNull: true,
    field: 'product_price'
  },
  quantity: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    field: 'quantity',
    defaultValue: 1
  }
}, {
    tableName: 'product'

})

module.exports = product
