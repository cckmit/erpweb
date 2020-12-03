'use strict'
const path = require('path')
const Excel = require('exceljs')

const parseExcel = function(opts) {
  var workbook = new Excel.Workbook()
  var filename = path.resolve(opts.readFile)
  return workbook.xlsx.readFile(filename)
    .catch(function(error) {
      console.log('read file error', error)
      return error
    })
    .then(function(workbook) {
      const worksheets = workbook.worksheets
      const data = {}
      for (let col = 2; col <= worksheets[0].columnCount; col++) {
        const lang = worksheets[0].getCell(1, col).value
        data[lang] = {
          lang: lang,
          column: col,
          file: path.resolve(opts.writeFile + lang + '.js')
        }
        data[lang].modules = []
        for (let index = 0; index < worksheets.length; index++) {
          const moduledata = {}
          moduledata.name = worksheets[index].name
          moduledata.length = worksheets[index].rowCount - 1
          moduledata.messages = []
          for (let row = 2; row <= worksheets[index].rowCount; row++) {
            const message = {}
            message.key = worksheets[index].getCell(row, 1)
            message.value = worksheets[index].getCell(row, col)
            moduledata.messages.push(message)
          }
          data[lang].modules.push(moduledata)
        }
      }
      return data
    })
}

const parse = function(opts) {
  return parseExcel(opts)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

module.exports = parse
