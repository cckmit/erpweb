// import parseTime, formatTime and set to filter
export {
  parseTime,
  formatTime
}
  from '@/utils'

import { convertUTCLocalTime } from '@/utils/validate'
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [{
    value: 1E18,
    symbol: 'E'
  },
  {
    value: 1E15,
    symbol: 'P'
  },
  {
    value: 1E12,
    symbol: 'T'
  },
  {
    value: 1E9,
    symbol: 'G'
  },
  {
    value: 1E6,
    symbol: 'M'
  },
  {
    value: 1E3,
    symbol: 'k'
  }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function translateOperate(string) {
  const obj = {
    login: '登录'
  }
  return obj[string] || ''
}

export function changeAlertType(val) {
  var ret = ''
  if (val === 'Less') {
    ret = '小于'
  } else if (val === 'Greater') {
    ret = '大于'
  } else if (val === 'Equal') {
    ret = '等于'
  } else {
    ret = ''
  }
  return ret
}

export function changeUndefinedShow(val) {
  var ret = ''
  if (val === undefined) {
    ret = 0
  } else {
    ret = val
  }
  return ret
}

export function statusFilter(val) {
  var ret = val
  if (val === 'OnLine') {
    ret = '在线'
  } else {
    ret = '离线'
  }
  return ret
}

export function getErrDesc(val) {
  const dev = val.alert_device
  switch (val.alert_device.alert_type) {
    case '设备事件告警':
      return dev.current_value
    case '设备数据告警':
      var c = dev.current_value || '0'
      var min = dev.alert_info.threshold_min || '0'
      if (min === 65535.65535) {
        min = '--'
      }
      var max = dev.alert_info.threshold_max || '0'
      if (max === 65535.65535) {
        max = '--'
      }
      return '当前值:  ' + c + '    范围:[ ' + min + '  ,  ' + max + ' ]'
  }
}
export function getWarnLevel(val) {
  const dev = val.alert_device
  var eventTypeList = {
    general: '普通事件',
    red: '红色告警',
    orange: '橙色告警',
    yellow: '黄色告警',
    blue: '蓝色告警'
  }
  return eventTypeList[dev.alert_info.alert_type]
}

export function getconfigure(val) {
  const dev = val.alert_device
  switch (val.alert_device.alert_type) {
    case '设备事件告警':
      return dev.cable_name
    case '设备数据告警':
      return dev.alert_info.attr_name
  }
}
// 计算公式转换
export function evalChange(fn) {
  const Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
  return (new Fn('return ' + fn)()).toFixed(2)
}

// 时间转换 时间戳转为2020-02-33 12:33:32
export function changeTimeShow(val) {
  if (val === undefined) {
    return ''
  } else {
    var time = convertUTCLocalTime(val * 1000)
    return time
  }
}

// 字段为空可以不添的情况下例如：线路
export function changeUndNullShow(val) {
  if (val === '' || val === undefined) {
    return '-'
  } else {
    return val
  }
}

// 离在线设备状态显示
export function devicestatusFilter(val) {
  var ret = val
  if (val === 'OnLine') {
    ret = '在线'
  } else {
    ret = '离线'
  }
  return ret
}

// 绿色在线 蓝色离线el-tag
export function tagstatusFilter(val) {
  var ret = val
  if (val === 'OnLine') {
    ret = 'success'
  } else {
    ret = 'info'
  }
  return ret
}

// 报警el-tag
export function alertflagFilter(val) {
  var ret = val
  if (val === '报警') {
    ret = 'danger'
  } else {
    ret = 'success'
  }
  return ret
}

// 门禁等一个值的 1 el-tag
export function switchFilter(val) {
  var ret = val
  if (val === '1') {
    ret = 'success'
  } else {
    ret = 'primary'
  }
  return ret
}

// 什么警状态
export function switchAlarmFilter(val) {
  var ret = val
  if (val === '0') {
    ret = 'success'
  } else {
    ret = 'danger'
  }
  return ret
}

export function changeAlarmStatus(val) {
  if (val === '0') {
    return '正常'
  } else {
    return '报警'
  }
}
// ch4传感器状态
export function changech4Status(val) {
  if (Number(val) === 0) {
    return '正常'
  } else if (Number(val) === 1) {
    return '报警'
  } else if (Number(val) === 2) {
    return '故障'
  } else if (Number(val) === 3) {
    return '预热'
  }
}
// 门禁等状态 文字
export function changeSwitchStatus(val) {
  var ret = val
  if (val === '1') {
    ret = '开启'
  } else {
    ret = '关闭'
  }
  return ret
}

// 运行停止状态 文字
export function changeYunxing(val) {
  var ret = val
  if (val === '1') {
    ret = '运行'
  } else {
    ret = '停止'
  }
  return ret
}

// 井盖属性
export function changeVibration(val) {
  var ret = val
  if (val === '1') {
    ret = '震动'
  } else {
    ret = '无震动'
  }
  return ret
}

// 电压、流状态
export function changeVCStatus(val) {
  if (Number(val) === 1) {
    return '过流'
  } else {
    return '正常'
  }
}

// 电量传感器状态
export function changeDimmStatus(val) {
  if (Number(val) === 1) {
    return '异常'
  } else {
    return '正常'
  }
}
