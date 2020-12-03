const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js_beautify
const defaultTpl = fs.readFileSync(path.join(__dirname, './template/default.hbs'), 'utf-8')
const modulesTpl = fs.readFileSync(path.join(__dirname, './template/modules.hbs'), 'utf-8')
Handlebars.registerPartial('modules', modulesTpl)
Handlebars.registerHelper('toLowerCase', function(word) {
  return word.toLowerCase()
})
Handlebars.registerHelper('brackets', function(word) {
  return `{${word}}`
})
module.exports = function(data) {
  for (const lang in data) {
    (function(lang, data) {
      const langData = data[lang]
      let template = Handlebars.compile(defaultTpl)(langData)
      template = beautify(template, {
        indent_size: 2,
        max_preserve_newlines: -1
      })
      fs.writeFile(langData.file, template, function(err) {
        if (err) {
          console.log('write file error', langData.file)
        } else {
          console.log('write file ok', langData.file)
        }
      })
    }(lang, data))
  }
  return data
}
