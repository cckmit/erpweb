import Excel from 'exceljs'
var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
export function JsonToExcel({
  header,
  data,
  filename,
  merges = [],
  borders = [],
  alignments = [],
  fills = [],
  fonts = []
} = {}) {
  var workbook = new Excel.Workbook()
  workbook.creator = 'Me'
  workbook.lastModifiedBy = 'Her'
  workbook.created = new Date(1985, 8, 30)
  workbook.modified = new Date()
  workbook.lastPrinted = new Date(2016, 9, 27)
  var sheet = workbook.addWorksheet('My Sheet')
  // 过后写index.vue里面
  var dobCol1 = sheet.getColumn(1)
  dobCol1.width = 20
  var dobCol2 = sheet.getColumn(2)
  dobCol2.width = 20
  var dobCol3 = sheet.getColumn(3)
  dobCol3.width = 15
  var dobCol4 = sheet.getColumn(4)
  dobCol4.width = 15
  var dobColP = sheet.getColumn('P')
  dobColP.width = 15
  var dobColQ = sheet.getColumn('Q')
  dobColQ.width = 15
  var dobColR = sheet.getColumn('R')
  dobColR.width = 25
  //   sheet.getCell('A1').font = {
  //     name: 'Comic Sans MS',
  //     family: 4,
  //     size: 18,
  //     bold: true
  //   }
  //   sheet.getCell('B1').font = {
  //     name: 'Comic Sans MS',
  //     family: 4,
  //     size: 18,
  //     bold: true
  //   }

  filename = filename || 'excel-list'
  sheet.addRows(header)
  sheet.addRows(data)

  if (merges.length > 0) {
    merges.forEach(item => {
      sheet.mergeCells(item)
    })
  }
  if (borders.length > 0) {
    borders.forEach(item => {
      sheet.getCell(item.name).border = item.body
    })
  }
  if (alignments.length > 0) {
    alignments.forEach(item => {
      sheet.getCell(item.name).alignment = item.body
    })
  }
  if (fills.length > 0) {
    fills.forEach(item => {
      sheet.getCell(item.name).fill = item.body
    })
  }
  // if (fonts.length > 0) {
  //   fonts.forEach(item => {
  //     sheet.getCell('A1').font = item.body
  //   })
  // }
  saveExcel(workbook, filename)
}

function saveExcel(workbook, filename) {
  workbook.xlsx.writeBuffer().then((data) => {
    saveShareContent(data, filename + '.xlsx')
  })
}

function saveShareContent(content, fileName) {
  const downLink = document.createElement('a')
  downLink.download = fileName // 字符内容转换为blod地址
  const blob = new Blob([content], { type: EXCEL_TYPE })
  downLink.href = URL.createObjectURL(blob) // 链接插入到页面
  document.body.appendChild(downLink)
  downLink.click() // 移除下载链接
  document.body.removeChild(downLink)
}

export function JsonToExcelRelation({
  header,
  data,
  filename,
  borders = [],
  alignments = [],
  fills = []
} = {}) {
  var workbook = new Excel.Workbook()
  workbook.creator = 'Me'
  workbook.lastModifiedBy = 'Her'
  workbook.created = new Date(1985, 8, 30)
  workbook.modified = new Date()
  workbook.lastPrinted = new Date(2016, 9, 27)
  var sheet = workbook.addWorksheet('My Sheet')

  filename = filename || 'excel-list'
  sheet.addRows(header)
  sheet.addRows(data)
  for (var i = 0; i < header[0].length; i++) {
    var dobCol = sheet.getColumn(i + 1)
    dobCol.width = 20
  }
  if (borders.length > 0) {
    borders.forEach(item => {
      sheet.getCell(item.name).border = item.body
    })
  }
  if (alignments.length > 0) {
    alignments.forEach(item => {
      sheet.getCell(item.name).alignment = item.body
    })
  }
  if (fills.length > 0) {
    fills.forEach(item => {
      sheet.getCell(item.name).fill = item.body
    })
  }
  saveExcel(workbook, filename)
}
