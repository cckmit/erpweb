/**
 * Created by PanJiaChen on 16/11/18.
 */

export function validPhone(phone) {
  if (phone === '') {
    return phone
  } else {
    return (/^1[3456789]\d{9}$/.test(phone))
  }
}

export function validThreshold(str) {
  return (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(str))
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  return str.trim().length > 5
}

export function validname(str) {
  return (/^[a-zA-Z0-9_]{5,16}$/.test(str))
}

/**
 * @description 区域名字验证(`/^[\p{Han}_a-zA-Z0-9\u4e00-\u9fa5]{1,16}$/`)
 * @param {string} str
 * @returns {Boolean}
 */
export function validRegionName(str) {
  const reg = /^[\p{Han}_a-zA-Z0-9\u4e00-\u9fa5]{1,16}$/
  return reg.test(str)
}
export function validdevicecode(str) {
  const reg = /^[\p{Han}_a-zA-Z0-9\u4e00-\u9fa5]{4,30}$/
  return reg.test(str)
}
export function validdevicename(str) {
  const reg = /^[\p{Han}_a-zA-Z0-9\-\u4e00-\u9fa5]{8,34}$/
  return reg.test(str)
}

export function validTypename(str) {
  const reg = /^[\p{Han}_a-zA-Z0-9\u4e00-\u9fa5]{1,16}$/
  return reg.test(str)
}
/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  if (email === '') {
    return email
  } else {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function validIP(str) {
  const reg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/
  return reg.test(str)
}

export function convertUTCLocalTime(date) {
  if (date === '') {
    return date
  }

  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var m1 = date.getMinutes()
  var s = date.getSeconds()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  h = h < 10 ? ('0' + h) : h
  m1 = m1 < 10 ? ('0' + m1) : m1
  s = s < 10 ? ('0' + s) : s
  return y + '-' + m + '-' + d + ' ' + h + ':' + m1 + ':' + s
}

export function convertUTCTime(date) {
  if (date === '') {
    return date
  }

  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

export function convertTime(date) {
  if (date === '') {
    return date
  }

  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var m1 = date.getMinutes()
  var s = date.getSeconds()
  var ms = date.getMilliseconds()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  h = h < 10 ? ('0' + h) : h
  m1 = m1 < 10 ? ('0' + m1) : m1
  s = s < 10 ? ('0' + s) : s
  return y + '-' + m + '-' + d + ' ' + h + ':' + m1 + ':' + s + ' ' + ms
}
export function isExcel(name) {
  return /\.(xlsx|xls)$/.test(name)
}

export function fixData(data) {
  let o = ''
  let l = 0
  const w = 10240
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}

export function convertUTCLocalMinute(date) {
  if (date === '') {
    return date
  }

  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var m1 = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  h = h < 10 ? ('0' + h) : h
  m1 = m1 < 10 ? ('0' + m1) : m1
  return y + '-' + m + '-' + d + ' ' + h + ':' + m1
}

export function GetCenter(points) {
  if (points.length > 0) {
    var maxLng = points[0].loc.longitude
    var minLng = points[0].loc.longitude
    var maxLat = points[0].loc.latitude
    var minLat = points[0].loc.latitude
    for (var j = points.length - 1; j >= 0; j--) {
      if (points[j].loc.longitude > maxLng) maxLng = points[j].loc.longitude
      if (points[j].loc.longitude < minLng) minLng = points[j].loc.longitude
      if (points[j].loc.latitude > maxLat) maxLat = points[j].loc.latitude
      if (points[j].loc.latitude < minLat) minLat = points[j].loc.latitude
    }
    var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
    var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
    var center = [cenLng, cenLat]
    return {
      center
    }
  } else {
    // 没有坐标，显示昆明
    return {
      center: [102.827963, 24.890363]
    }
  }
}

export function findMaxOrMinItem(List, key, type) {
	let res = {}
	res[key] = 0
	for (let item of List) { 
		if (type === 'max') {
			if (Number(res[key]) < Number(item[key])) { 
				res = item
			}
		} else { 
				if (Number(res[key]) > Number(item[key])) { 
				res = item
			}
		}
	}
	return [res]
 }
