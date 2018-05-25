
var Sequelize = require('sequelize')
const config = require('./config.js')
const cls = require('continuation-local-storage')
const namespace = cls.createNamespace('namespace')
const timezone = 'UTC'
var moment = require('moment').tz.setDefault(timezone)
Sequelize.useCLS(namespace)
console.log('config', config)
const sequelize = new Sequelize(config.DBName, config.DBUser, config.DBPassword, {
  host: config.DBHost,
  dialect: 'mysql',
  define: {

    freezeTableName: true,
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
  ,
  dialectOptions: {
   //useUTC: true //for reading from database
    typeCast: function (field, next) { // for reading from database
      if (field.type == 'DATE' || field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
             //console.log("field--------", field)
             //console.log("field.type", field.type)
             var d = moment(field.string())
          //  console.log("-----", d)
            return d
         }
      return next()
    }
  }
})

module.exports = sequelize
