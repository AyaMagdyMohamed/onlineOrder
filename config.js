var fs = require('fs')
var os = require('os')
var configObj = {}
var readData = function () {
  var data = fs.readFileSync('./configurations.txt')
  var configArr = data.toString().trim().split(os.EOL)

  for (var i = 0; i < configArr.length; i++) {
    if (/^\s*$/.test(configArr[i])) {
      console.log('line is blank')
      continue
    }
    var str = configArr[i]
    str = str.trim()
    var temp = str.split('=')
    // console.log(temp)
    configObj[temp[0].trim()] = temp[1].trim()
  }
  return configObj
}

configObj = readData()
module.exports = configObj
