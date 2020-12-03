const parse = require('./lib/parse.js')
const codegen = require('./lib/codegen.js')
module.exports = function(opt) {
  return parse(opt)
    .then((data) => {
      codegen(data)
    })
    .catch((error) => {
      return error
    })
}
