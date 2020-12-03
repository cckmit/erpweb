const i18nGen = require('.')

module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
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

  grunt.registerMultiTask('i18n-codegen', function() {
    this.async()
    var opt = this.options()
    grunt.log.writeln('opt:', opt)
    i18nGen({
      readFile: opt.definition,
      writeFile: opt.dist
    })
  })

  grunt.registerTask('i18n', ['i18n-codegen'])
}
