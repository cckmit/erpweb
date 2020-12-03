const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const swaggerGen = require('.')

module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'swagger-vue-codegen': {
      options: {
        swagger: '<%= pkg.swagger.definition %>',
        className: '<%= pkg.swagger.className %>',
        moduleName: '<%= pkg.swagger.moduleName %>',
        dest: '<%= pkg.swagger.dest %>'
      },
      dist: {

      }
    }
  })

  grunt.registerMultiTask('swagger-vue-codegen', function() {
    var callback = this.async()
    var opt = this.options()
    var distFileName = path.join(opt.dest, opt.moduleName + '.js')
    fs.readFile(opt.swagger, function(err, data) {
      if (err) {
        grunt.log.error(err.toString())
        callback(false)
      } else {
        const type = opt.swagger.substr(opt.swagger.length - 4, 4)
        var parsedData = {}
        if (type === 'yaml') {
          parsedData = yaml.load(data)
        } else if (type === 'json') {
          parsedData = JSON.parse(data)
        } else {
          parsedData = JSON.parse(data)
        }
        var codeResult = swaggerGen({
          swagger: parsedData,
          moduleName: opt.moduleName,
          className: opt.className
        })

        fs.writeFile(distFileName, codeResult, function(err) {
          if (err) {
            grunt.log.error(err.toString())
            callback(false)
          } else {
            grunt.log.writeln('Generated ' + distFileName + ' from ' + opt.swagger)
          }
        })
      }
    })
  })

  grunt.registerTask('vue', ['swagger-vue-codegen'])
}
