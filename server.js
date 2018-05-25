
const express = require('express')
const app = express()
const user = require('./routes/userRoute')
const users = require('./routes/userAuth')
const profile = require('./routes/profile')
const product = require('./routes/product')
const admin = require('./routes/admin')
const config = require('./config')
const httpStatus = require('http-status')
const path = require('path')
var swaggerJSDoc = require('swagger-jsdoc')
var tokenCheck = require('./security/checkRouterFilter')
var webError = require('./public/ErrorMessages/WebErrors')
var session=require("express-session");
const prefix = '/api'

var swaggerDefinition = {
  info: {
    version: '1.0.0',
    title: 'online order Backend Services'
  },
  basePath: '/',
  securityDefinitions: {
    'Bearer': {
      'type': 'apiKey',
      'name': 'Authorization',
      'in': 'header'
    }
  },
  'security': [
    {
      'Bearer': [

      ]
    }
  ]
}
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js']
}
var swaggerSpec = swaggerJSDoc(options)
app.use(session({secret:"@$#$^%^&^"}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req,resp,next){
  resp.locals={
    // get from session according to session id
    loggedIn:req.session.loggedIn,
    username:req.session.username,
    role: req.session.role
  }
  next();
})
app.set('superSecret', config.secret)

app.use(tokenCheck)

app.use(prefix + '/authentication', users)

// -------authenticated middlewares---------------
app.use(prefix + '/profile', profile)
app.use(prefix + '/user', user)
app.use(prefix + '/admin', admin)
app.use(prefix + '/products', product)



app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  console.log(req._parsedUrl.pathname)

  res.send(swaggerSpec)
})

app.use(function (req, res, next) {
  // res.status(httpStatus.NOT_FOUND).send(WebErrors.notFound)
  res.status(httpStatus.NOT_FOUND).send(webError.notFound)
})

app.listen(8000, '0.0.0.0', function () {
  console.log('listening on *:8000')
})
