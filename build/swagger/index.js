const parse = require('./lib/parse.js')
const codegen = require('./lib/codegen.js')
module.exports = function(opt) {
  var data = parse(opt)
  var codeResult = codegen(data)
  // console.log('aa', codeResult)
  return codeResult
}
