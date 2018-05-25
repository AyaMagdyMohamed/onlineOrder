
var tokenCheck = require('./checkToken')
var url = require('url')
var UrlPattern = require('url-pattern')
var prefix = '/api'
function patterMatch (req, url) {
  var pattern = new UrlPattern(prefix + url)
  if (pattern.match(req._parsedUrl.pathname) !== '{}' && pattern.match(req._parsedUrl.pathname) !== null) {
    return true
  } else {
    return false
  }
}
module.exports = function (req, res, next) {
  var parts = url.parse(req.url, true)
  if (req._parsedUrl.pathname === (prefix + '/products') || req._parsedUrl.pathname === (prefix + '/authentication/login') ||  req._parsedUrl.pathname === ('/api-docs') ||
   req._parsedUrl.pathname === ('/swagger.json') || req._parsedUrl.pathname === (prefix + '/user/signup') ) {
    console.log('result is false')
    next()
  } else {
    tokenCheck(req, res, next)
  }
}
