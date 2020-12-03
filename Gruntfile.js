const yaml = require('js-yaml')
const fs = require('fs')
const swaggerGen = require('./build/swagger')
const i18nGen = require('./build/i18n')

module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'swagger-codegen': {
      options: {
        swagger: '<%= pkg.swagger.definition %>',
        className: '<%= pkg.swagger.className %>',
        moduleName: '<%= pkg.swagger.moduleName %>',
        dist: '<%= pkg.swagger.dist %>'
      },
      dist: {

      }
    },
    'i18n-codegen': {
      options: {
        definition: '<%= pkg.i18n.definition %>',
        className: '<%= pkg.i18n.className %>',
        moduleName: '<%= pkg.i18n.moduleName %>',
        dist: '<%= pkg.i18n.dist %>'
      },
      dist: {

      }
    }
  })

  grunt.registerMultiTask('swagger-codegen', function() {
    var callback = this.async()
    var opt = this.options()
    fs.readFile(opt.swagger, function(err, data) {
      if (err) {
        grunt.log.error(err.toString())
        callback(false)
      } else {
        console.log(opt)
        const type = opt.swagger.substr(opt.swagger.length - 4, 4)
        var parsedData = {}
        if (type === 'yaml') {
          parsedData = yaml.load(data)
        } else if (type === 'json') {
          parsedData = JSON.parse(data)
        } else {
          parsedData = JSON.parse(data)
        }
        var str = swaggerGen({
          swagger: parsedData,
          moduleName: opt.moduleName,
          className: opt.className,
          dist: opt.dist
        })
        fs.writeFile(opt.dist + opt.moduleName + '.js', str, function(err) {
          if (err) {
            grunt.log.error(err.toString())
            callback(false)
          } else {
            // grunt.log.writeln('Generated ' + str + ' from ' + opt.swagger)
          }
        })
      }
    })
  })

  grunt.registerMultiTask('i18n-codegen', function() {
    this.async()
    var opt = this.options()
    grunt.log.writeln('opt:', opt)
    i18nGen({
      readFile: opt.definition,
      writeFile: opt.dist
    })
  })
  grunt.registerTask('vue', ['swagger-codegen'])
  grunt.registerTask('i18n', ['i18n-codegen'])
}
