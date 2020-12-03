/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
let domain = 'http://192.168.1.118:30443/v1'
let axiosInstance = axios.create()
const ContentType_MultipartFormData = 'multipart/form-data'
export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const getAxiosInstance = () => {
  return axiosInstance
}
export const setAxiosInstance = ($axiosInstance) => {
  axiosInstance = $axiosInstance
}

function isFormData(config) {
  if (config !== undefined &&
    config.headers !== undefined &&
    config.headers['Content-Type'] !== undefined &&
    config.headers['Content-Type'].indexOf(ContentType_MultipartFormData) !== -1) {
    return true
  } else {
    return false
  }
}
export const request = (method, url, body, queryParameters, form, formData, config = {}) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    if (method === 'delete') {
      config.data = body
      return axiosInstance[method](queryUrl, config)
    } else {
      return axiosInstance[method](queryUrl, body, config)
    }
  } else if (method === 'get' || method === 'delete' || method === 'head' || method === 'option') {
    return axiosInstance[method](queryUrl, config)
  } else {
    if (isFormData(config)) {
      return axiosInstance[method](queryUrl, formData, config)
    } else {
      return axiosInstance[method](queryUrl, qs.stringify(form), config)
    }
  }
}
/*==========================================================
 *                    迪森综合监控平台API
 ==========================================================*/
/**
 * 权限认证
 * request: Token
 * url: TokenURL
 * method: Token_TYPE
 * raw_url: Token_RAW_URL
 * @param username - 用户名
 * @param password - 密码
 * @param grantType - 认证类型
 * @param scope - 参数
 */
export const Token = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/oauth/token'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (parameters['username'] !== undefined) {
    form['username'] = parameters['username']
  }
  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'))
  }
  if (parameters['password'] !== undefined) {
    form['password'] = parameters['password']
  }
  if (parameters['password'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: password'))
  }
  if (parameters['grantType'] !== undefined) {
    form['grant_type'] = parameters['grantType']
  }
  if (parameters['grantType'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: grantType'))
  }
  if (parameters['scope'] !== undefined) {
    form['scope'] = parameters['scope']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const Token_RAW_URL = function() {
  return '/oauth/token'
}
export const Token_TYPE = function() {
  return 'post'
}
export const TokenURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/oauth/token'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 刷新认证信息
 * request: RefreshToken
 * url: RefreshTokenURL
 * method: RefreshToken_TYPE
 * raw_url: RefreshToken_RAW_URL
 * @param refreshToken - 认证token
 * @param grantType - 认证类型
 * @param scope - 参数
 */
export const RefreshToken = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/oauth/token/refresh'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (parameters['refreshToken'] !== undefined) {
    form['refresh_token'] = parameters['refreshToken']
  }
  if (parameters['refreshToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: refreshToken'))
  }
  if (parameters['grantType'] !== undefined) {
    form['grant_type'] = parameters['grantType']
  }
  if (parameters['scope'] !== undefined) {
    form['scope'] = parameters['scope']
  }
  if (parameters['scope'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: scope'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const RefreshToken_RAW_URL = function() {
  return '/oauth/token/refresh'
}
export const RefreshToken_TYPE = function() {
  return 'post'
}
export const RefreshTokenURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/oauth/token/refresh'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建新的验证码
 * request: CreateCaptcha
 * url: CreateCaptchaURL
 * method: CreateCaptcha_TYPE
 * raw_url: CreateCaptcha_RAW_URL
 */
export const CreateCaptcha = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/captcha'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const CreateCaptcha_RAW_URL = function() {
  return '/captcha'
}
export const CreateCaptcha_TYPE = function() {
  return 'get'
}
export const CreateCaptchaURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/captcha'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 验证码
 * request: GetCaptcha
 * url: GetCaptchaURL
 * method: GetCaptcha_TYPE
 * raw_url: GetCaptcha_RAW_URL
 * @param captchaId - 验证码ID
 * @param reload - 刷新验证码时间按戳
 */
export const GetCaptcha = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/captcha/{captcha_id}.png'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{captcha_id}', `${parameters['captchaId']}`)
  if (parameters['captchaId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: captchaId'))
  }
  if (parameters['reload'] !== undefined) {
    queryParameters['reload'] = parameters['reload']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCaptcha_RAW_URL = function() {
  return '/captcha/{captcha_id}.png'
}
export const GetCaptcha_TYPE = function() {
  return 'get'
}
export const GetCaptchaURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/captcha/{captcha_id}.png'
  path = path.replace('{captcha_id}', `${parameters['captchaId']}`)
  if (parameters['reload'] !== undefined) {
    queryParameters['reload'] = parameters['reload']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 验证码认证
 * request: Verify
 * url: VerifyURL
 * method: Verify_TYPE
 * raw_url: Verify_RAW_URL
 * @param captchaId - 验证码ID
 * @param captchaValue - 验证码值
 */
export const Verify = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/captcha/verify'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (parameters['captchaId'] !== undefined) {
    form['captcha_id'] = parameters['captchaId']
  }
  if (parameters['captchaId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: captchaId'))
  }
  if (parameters['captchaValue'] !== undefined) {
    form['captcha_value'] = parameters['captchaValue']
  }
  if (parameters['captchaValue'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: captchaValue'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const Verify_RAW_URL = function() {
  return '/captcha/verify'
}
export const Verify_TYPE = function() {
  return 'post'
}
export const VerifyURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/captcha/verify'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 门思数据
 * request: ManthinkData
 * url: ManthinkDataURL
 * method: ManthinkData_TYPE
 * raw_url: ManthinkData_RAW_URL
 * @param body - 消息内容
 */
export const ManthinkData = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/manthink/data'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const ManthinkData_RAW_URL = function() {
  return '/analysis/manthink/data'
}
export const ManthinkData_TYPE = function() {
  return 'post'
}
export const ManthinkDataURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/manthink/data'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 设备注册
 * request: MonReg
 * url: MonRegURL
 * method: MonReg_TYPE
 * raw_url: MonReg_RAW_URL
 * @param body - 消息内容
 */
export const MonReg = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/reg'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const MonReg_RAW_URL = function() {
  return '/analysis/mon/reg'
}
export const MonReg_TYPE = function() {
  return 'post'
}
export const MonRegURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/reg'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取注册信息
 * request: GetCurrentMonRegs
 * url: GetCurrentMonRegsURL
 * method: GetCurrentMonRegs_TYPE
 * raw_url: GetCurrentMonRegs_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCurrentMonRegs = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/regs/current'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentMonRegs_RAW_URL = function() {
  return '/analysis/mon/regs/current'
}
export const GetCurrentMonRegs_TYPE = function() {
  return 'get'
}
export const GetCurrentMonRegsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/regs/current'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史注册信息
 * request: GetHistoryMonRegs
 * url: GetHistoryMonRegsURL
 * method: GetHistoryMonRegs_TYPE
 * raw_url: GetHistoryMonRegs_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryMonRegs = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/regs/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryMonRegs_RAW_URL = function() {
  return '/analysis/mon/regs/history'
}
export const GetHistoryMonRegs_TYPE = function() {
  return 'get'
}
export const GetHistoryMonRegsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/regs/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 设备数据
 * request: MonData
 * url: MonDataURL
 * method: MonData_TYPE
 * raw_url: MonData_RAW_URL
 * @param body - 消息内容
 */
export const MonData = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/data'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const MonData_RAW_URL = function() {
  return '/analysis/mon/data'
}
export const MonData_TYPE = function() {
  return 'post'
}
export const MonDataURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/data'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取数据信息
 * request: GetCurrentMonDatas
 * url: GetCurrentMonDatasURL
 * method: GetCurrentMonDatas_TYPE
 * raw_url: GetCurrentMonDatas_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCurrentMonDatas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/datas/current'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentMonDatas_RAW_URL = function() {
  return '/analysis/mon/datas/current'
}
export const GetCurrentMonDatas_TYPE = function() {
  return 'get'
}
export const GetCurrentMonDatasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/datas/current'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史数据信息
 * request: GetHistoryMonDatas
 * url: GetHistoryMonDatasURL
 * method: GetHistoryMonDatas_TYPE
 * raw_url: GetHistoryMonDatas_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryMonDatas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/datas/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryMonDatas_RAW_URL = function() {
  return '/analysis/mon/datas/history'
}
export const GetHistoryMonDatas_TYPE = function() {
  return 'get'
}
export const GetHistoryMonDatasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/datas/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 设备事件
 * request: MonEvent
 * url: MonEventURL
 * method: MonEvent_TYPE
 * raw_url: MonEvent_RAW_URL
 * @param body - 消息内容
 */
export const MonEvent = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/event'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const MonEvent_RAW_URL = function() {
  return '/analysis/mon/event'
}
export const MonEvent_TYPE = function() {
  return 'post'
}
export const MonEventURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/event'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取事件信息
 * request: GetCurrentMonEvents
 * url: GetCurrentMonEventsURL
 * method: GetCurrentMonEvents_TYPE
 * raw_url: GetCurrentMonEvents_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCurrentMonEvents = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/events/current'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentMonEvents_RAW_URL = function() {
  return '/analysis/mon/events/current'
}
export const GetCurrentMonEvents_TYPE = function() {
  return 'get'
}
export const GetCurrentMonEventsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/events/current'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史事件信息
 * request: GetHistoryMonEvents
 * url: GetHistoryMonEventsURL
 * method: GetHistoryMonEvents_TYPE
 * raw_url: GetHistoryMonEvents_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryMonEvents = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/events/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryMonEvents_RAW_URL = function() {
  return '/analysis/mon/events/history'
}
export const GetHistoryMonEvents_TYPE = function() {
  return 'get'
}
export const GetHistoryMonEventsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/events/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 设备心跳
 * request: MonHeartbeat
 * url: MonHeartbeatURL
 * method: MonHeartbeat_TYPE
 * raw_url: MonHeartbeat_RAW_URL
 * @param body - 消息内容
 */
export const MonHeartbeat = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/heartbeat'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const MonHeartbeat_RAW_URL = function() {
  return '/analysis/mon/heartbeat'
}
export const MonHeartbeat_TYPE = function() {
  return 'post'
}
export const MonHeartbeatURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/heartbeat'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 设备对时
 * request: MonTime
 * url: MonTimeURL
 * method: MonTime_TYPE
 * raw_url: MonTime_RAW_URL
 * @param body - 消息内容
 */
export const MonTime = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/mon/time'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const MonTime_RAW_URL = function() {
  return '/analysis/mon/time'
}
export const MonTime_TYPE = function() {
  return 'post'
}
export const MonTimeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/mon/time'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 数据聚合
 * request: Aggregate
 * url: AggregateURL
 * method: Aggregate_TYPE
 * raw_url: Aggregate_RAW_URL
 * @param collection - 表名
 * @param pipeline - 聚合条件语句
 */
export const Aggregate = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/analysis/{collection}/aggregate'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{collection}', `${parameters['collection']}`)
  if (parameters['collection'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: collection'))
  }
  if (parameters['pipeline'] !== undefined) {
    body = parameters['pipeline']
  }
  if (parameters['pipeline'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: pipeline'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const Aggregate_RAW_URL = function() {
  return '/analysis/{collection}/aggregate'
}
export const Aggregate_TYPE = function() {
  return 'post'
}
export const AggregateURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/analysis/{collection}/aggregate'
  path = path.replace('{collection}', `${parameters['collection']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑测量数据信息
 * request: UpdateMeasure
 * url: UpdateMeasureURL
 * method: UpdateMeasure_TYPE
 * raw_url: UpdateMeasure_RAW_URL
 * @param id - 测量数据信息ID
 * @param body - 测量数据信息参数
 */
export const UpdateMeasure = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/measure/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateMeasure_RAW_URL = function() {
  return '/system/measure/{id}'
}
export const UpdateMeasure_TYPE = function() {
  return 'put'
}
export const UpdateMeasureURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/measure/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除测量数据信息
 * request: DeleteMeasure
 * url: DeleteMeasureURL
 * method: DeleteMeasure_TYPE
 * raw_url: DeleteMeasure_RAW_URL
 * @param id - 测量数据信息ID
 */
export const DeleteMeasure = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/measure/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteMeasure_RAW_URL = function() {
  return '/system/measure/{id}'
}
export const DeleteMeasure_TYPE = function() {
  return 'delete'
}
export const DeleteMeasureURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/measure/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建测量数据信息
 * request: CreateMeasure
 * url: CreateMeasureURL
 * method: CreateMeasure_TYPE
 * raw_url: CreateMeasure_RAW_URL
 * @param body - 测量数据信息参数
 */
export const CreateMeasure = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/measure'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateMeasure_RAW_URL = function() {
  return '/system/measure'
}
export const CreateMeasure_TYPE = function() {
  return 'post'
}
export const CreateMeasureURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/measure'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 导入多条测量数据信息
 * request: InsertMeasures
 * url: InsertMeasuresURL
 * method: InsertMeasures_TYPE
 * raw_url: InsertMeasures_RAW_URL
 * @param body - 测量数据信息参数
 */
export const InsertMeasures = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/measure'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const InsertMeasures_RAW_URL = function() {
  return '/system/measure'
}
export const InsertMeasures_TYPE = function() {
  return 'patch'
}
export const InsertMeasuresURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/measure'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取测量数据信息列表
 * request: GetMeasures
 * url: GetMeasuresURL
 * method: GetMeasures_TYPE
 * raw_url: GetMeasures_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetMeasures = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/measures'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetMeasures_RAW_URL = function() {
  return '/system/measures'
}
export const GetMeasures_TYPE = function() {
  return 'get'
}
export const GetMeasuresURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/measures'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个用户的详细信息
 * request: GetUser
 * url: GetUserURL
 * method: GetUser_TYPE
 * raw_url: GetUser_RAW_URL
 * @param id - 用户ID
 */
export const GetUser = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/user/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetUser_RAW_URL = function() {
  return '/system/user/{id}'
}
export const GetUser_TYPE = function() {
  return 'get'
}
export const GetUserURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/user/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑单个用户信息
 * request: UpdateUser
 * url: UpdateUserURL
 * method: UpdateUser_TYPE
 * raw_url: UpdateUser_RAW_URL
 * @param id - 用户ID
 * @param body - 用户参数
 */
export const UpdateUser = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/user/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateUser_RAW_URL = function() {
  return '/system/user/{id}'
}
export const UpdateUser_TYPE = function() {
  return 'put'
}
export const UpdateUserURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/user/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除单个用户
 * request: DeleteUser
 * url: DeleteUserURL
 * method: DeleteUser_TYPE
 * raw_url: DeleteUser_RAW_URL
 * @param id - 用户ID
 */
export const DeleteUser = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/user/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteUser_RAW_URL = function() {
  return '/system/user/{id}'
}
export const DeleteUser_TYPE = function() {
  return 'delete'
}
export const DeleteUserURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/user/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * This can only be done by the logged in user.
 * request: ChangeUserPassword
 * url: ChangeUserPasswordURL
 * method: ChangeUserPassword_TYPE
 * raw_url: ChangeUserPassword_RAW_URL
 * @param id - 用户ID
 * @param username - 用户名
 * @param password - 密码
 */
export const ChangeUserPassword = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/user/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['username'] !== undefined) {
    form['username'] = parameters['username']
  }
  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'))
  }
  if (parameters['password'] !== undefined) {
    form['password'] = parameters['password']
  }
  if (parameters['password'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: password'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const ChangeUserPassword_RAW_URL = function() {
  return '/system/user/{id}'
}
export const ChangeUserPassword_TYPE = function() {
  return 'patch'
}
export const ChangeUserPasswordURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/user/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取当前登陆用户信息
 * request: GetUserInfo
 * url: GetUserInfoURL
 * method: GetUserInfo_TYPE
 * raw_url: GetUserInfo_RAW_URL
 */
export const GetUserInfo = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/user'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetUserInfo_RAW_URL = function() {
  return '/system/user'
}
export const GetUserInfo_TYPE = function() {
  return 'get'
}
export const GetUserInfoURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/user'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建单个用户
 * request: CreateUser
 * url: CreateUserURL
 * method: CreateUser_TYPE
 * raw_url: CreateUser_RAW_URL
 * @param body - 用户参数
 */
export const CreateUser = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/user'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateUser_RAW_URL = function() {
  return '/system/user'
}
export const CreateUser_TYPE = function() {
  return 'post'
}
export const CreateUserURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/user'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 登录用户修改自己的密码
 * request: ChangeCurrentUserPassword
 * url: ChangeCurrentUserPasswordURL
 * method: ChangeCurrentUserPassword_TYPE
 * raw_url: ChangeCurrentUserPassword_RAW_URL
 * @param userName - 用户名
 * @param oldPassword - 原始密码
 * @param newPassword - 新密码
 */
export const ChangeCurrentUserPassword = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/user'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (parameters['userName'] !== undefined) {
    queryParameters['user_name'] = parameters['userName']
  }
  if (parameters['oldPassword'] !== undefined) {
    form['old_password'] = parameters['oldPassword']
  }
  if (parameters['oldPassword'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: oldPassword'))
  }
  if (parameters['newPassword'] !== undefined) {
    form['new_password'] = parameters['newPassword']
  }
  if (parameters['newPassword'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: newPassword'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const ChangeCurrentUserPassword_RAW_URL = function() {
  return '/system/user'
}
export const ChangeCurrentUserPassword_TYPE = function() {
  return 'patch'
}
export const ChangeCurrentUserPasswordURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/user'
  if (parameters['userName'] !== undefined) {
    queryParameters['user_name'] = parameters['userName']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取用户列表
 * request: GetUsers
 * url: GetUsersURL
 * method: GetUsers_TYPE
 * raw_url: GetUsers_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetUsers = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/users'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetUsers_RAW_URL = function() {
  return '/system/users'
}
export const GetUsers_TYPE = function() {
  return 'get'
}
export const GetUsersURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/users'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 用户登陆
 * request: Login
 * url: LoginURL
 * method: Login_TYPE
 * raw_url: Login_RAW_URL
 * @param username - 用户名
 * @param password - 密码
 */
export const Login = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/login'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (parameters['username'] !== undefined) {
    form['username'] = parameters['username']
  }
  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'))
  }
  if (parameters['password'] !== undefined) {
    form['password'] = parameters['password']
  }
  if (parameters['password'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: password'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const Login_RAW_URL = function() {
  return '/system/login'
}
export const Login_TYPE = function() {
  return 'post'
}
export const LoginURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/login'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 用户登出
 * request: Logout
 * url: LogoutURL
 * method: Logout_TYPE
 * raw_url: Logout_RAW_URL
 */
export const Logout = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/logout'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const Logout_RAW_URL = function() {
  return '/system/logout'
}
export const Logout_TYPE = function() {
  return 'get'
}
export const LogoutURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/logout'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑公司信息
 * request: UpdateCompany
 * url: UpdateCompanyURL
 * method: UpdateCompany_TYPE
 * raw_url: UpdateCompany_RAW_URL
 * @param id - 公司ID
 * @param body - 公司参数
 */
export const UpdateCompany = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/company/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateCompany_RAW_URL = function() {
  return '/system/company/{id}'
}
export const UpdateCompany_TYPE = function() {
  return 'put'
}
export const UpdateCompanyURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/company/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除公司
 * request: DeleteCompany
 * url: DeleteCompanyURL
 * method: DeleteCompany_TYPE
 * raw_url: DeleteCompany_RAW_URL
 * @param id - 公司ID
 */
export const DeleteCompany = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/company/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteCompany_RAW_URL = function() {
  return '/system/company/{id}'
}
export const DeleteCompany_TYPE = function() {
  return 'delete'
}
export const DeleteCompanyURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/company/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建公司
 * request: CreateCompany
 * url: CreateCompanyURL
 * method: CreateCompany_TYPE
 * raw_url: CreateCompany_RAW_URL
 * @param parentid - 父节点Id
 * @param body - 公司参数
 */
export const CreateCompany = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/company'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['parentid'] !== undefined) {
    queryParameters['parentid'] = parameters['parentid']
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateCompany_RAW_URL = function() {
  return '/system/company'
}
export const CreateCompany_TYPE = function() {
  return 'post'
}
export const CreateCompanyURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/company'
  if (parameters['parentid'] !== undefined) {
    queryParameters['parentid'] = parameters['parentid']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取公司列表
 * request: GetCompanys
 * url: GetCompanysURL
 * method: GetCompanys_TYPE
 * raw_url: GetCompanys_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCompanys = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/companys'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCompanys_RAW_URL = function() {
  return '/system/companys'
}
export const GetCompanys_TYPE = function() {
  return 'get'
}
export const GetCompanysURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/companys'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 通过父节点ID获取子节点信息列表
 * request: GetCompanysByID
 * url: GetCompanysByIDURL
 * method: GetCompanysByID_TYPE
 * raw_url: GetCompanysByID_RAW_URL
 * @param id - 父节点ID
 */
export const GetCompanysByID = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/companys'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const GetCompanysByID_RAW_URL = function() {
  return '/system/companys'
}
export const GetCompanysByID_TYPE = function() {
  return 'patch'
}
export const GetCompanysByIDURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/companys'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取组织机构关系树列表
 * request: GetFullTrees
 * url: GetFullTreesURL
 * method: GetFullTrees_TYPE
 * raw_url: GetFullTrees_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetFullTrees = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/fullTrees'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetFullTrees_RAW_URL = function() {
  return '/system/fullTrees'
}
export const GetFullTrees_TYPE = function() {
  return 'get'
}
export const GetFullTreesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/fullTrees'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑角色信息
 * request: UpdateRole
 * url: UpdateRoleURL
 * method: UpdateRole_TYPE
 * raw_url: UpdateRole_RAW_URL
 * @param name - 角色名
 * @param body - 角色参数
 */
export const UpdateRole = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/role/{name}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters['name'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: name'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateRole_RAW_URL = function() {
  return '/system/role/{name}'
}
export const UpdateRole_TYPE = function() {
  return 'put'
}
export const UpdateRoleURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/role/{name}'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除角色
 * request: DeleteRole
 * url: DeleteRoleURL
 * method: DeleteRole_TYPE
 * raw_url: DeleteRole_RAW_URL
 * @param name - 角色名
 */
export const DeleteRole = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/role/{name}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters['name'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: name'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteRole_RAW_URL = function() {
  return '/system/role/{name}'
}
export const DeleteRole_TYPE = function() {
  return 'delete'
}
export const DeleteRoleURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/role/{name}'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建角色
 * request: CreateRole
 * url: CreateRoleURL
 * method: CreateRole_TYPE
 * raw_url: CreateRole_RAW_URL
 * @param body - 角色参数
 */
export const CreateRole = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/role'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateRole_RAW_URL = function() {
  return '/system/role'
}
export const CreateRole_TYPE = function() {
  return 'post'
}
export const CreateRoleURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/role'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取角色列表
 * request: GetRoles
 * url: GetRolesURL
 * method: GetRoles_TYPE
 * raw_url: GetRoles_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetRoles = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/roles'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetRoles_RAW_URL = function() {
  return '/system/roles'
}
export const GetRoles_TYPE = function() {
  return 'get'
}
export const GetRolesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/roles'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取系统日志列表
 * request: GetSystemLogs
 * url: GetSystemLogsURL
 * method: GetSystemLogs_TYPE
 * raw_url: GetSystemLogs_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetSystemLogs = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/systemLogs'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetSystemLogs_RAW_URL = function() {
  return '/system/systemLogs'
}
export const GetSystemLogs_TYPE = function() {
  return 'get'
}
export const GetSystemLogsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/systemLogs'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 向角色添加菜单
 * request: AddMenu
 * url: AddMenuURL
 * method: AddMenu_TYPE
 * raw_url: AddMenu_RAW_URL
 * @param rolename - 角色名
 * @param body - 角色参数
 */
export const AddMenu = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/menu/{rolename}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters['rolename'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rolename'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const AddMenu_RAW_URL = function() {
  return '/system/menu/{rolename}'
}
export const AddMenu_TYPE = function() {
  return 'post'
}
export const AddMenuURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/menu/{rolename}'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 从角色移除菜单
 * request: RemoveMenu
 * url: RemoveMenuURL
 * method: RemoveMenu_TYPE
 * raw_url: RemoveMenu_RAW_URL
 * @param rolename - 角色名
 * @param body - 角色参数
 */
export const RemoveMenu = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/menu/{rolename}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters['rolename'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rolename'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const RemoveMenu_RAW_URL = function() {
  return '/system/menu/{rolename}'
}
export const RemoveMenu_TYPE = function() {
  return 'delete'
}
export const RemoveMenuURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/menu/{rolename}'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 向角色添加菜单
 * request: AddMenus
 * url: AddMenusURL
 * method: AddMenus_TYPE
 * raw_url: AddMenus_RAW_URL
 * @param rolename - 角色名
 * @param body - 角色参数
 */
export const AddMenus = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/menus/{rolename}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters['rolename'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rolename'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const AddMenus_RAW_URL = function() {
  return '/system/menus/{rolename}'
}
export const AddMenus_TYPE = function() {
  return 'post'
}
export const AddMenusURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/menus/{rolename}'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 从角色移除菜单
 * request: RemoveMenus
 * url: RemoveMenusURL
 * method: RemoveMenus_TYPE
 * raw_url: RemoveMenus_RAW_URL
 * @param rolename - 角色名
 * @param body - 角色参数
 */
export const RemoveMenus = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/menus/{rolename}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters['rolename'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rolename'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const RemoveMenus_RAW_URL = function() {
  return '/system/menus/{rolename}'
}
export const RemoveMenus_TYPE = function() {
  return 'delete'
}
export const RemoveMenusURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/menus/{rolename}'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 更角色菜单
 * request: UpdateMenus
 * url: UpdateMenusURL
 * method: UpdateMenus_TYPE
 * raw_url: UpdateMenus_RAW_URL
 * @param rolename - 角色名
 * @param body - 角色参数
 */
export const UpdateMenus = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/menus/{rolename}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters['rolename'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rolename'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateMenus_RAW_URL = function() {
  return '/system/menus/{rolename}'
}
export const UpdateMenus_TYPE = function() {
  return 'put'
}
export const UpdateMenusURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/menus/{rolename}'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取角色菜单
 * request: GetMenus
 * url: GetMenusURL
 * method: GetMenus_TYPE
 * raw_url: GetMenus_RAW_URL
 * @param rolename - 角色名
 */
export const GetMenus = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/menus/{rolename}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters['rolename'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rolename'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetMenus_RAW_URL = function() {
  return '/system/menus/{rolename}'
}
export const GetMenus_TYPE = function() {
  return 'get'
}
export const GetMenusURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/menus/{rolename}'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 判断角色是否有菜单的权限
 * request: MenuEnforce
 * url: MenuEnforceURL
 * method: MenuEnforce_TYPE
 * raw_url: MenuEnforce_RAW_URL
 * @param rolename - 角色名
 * @param body - 角色参数
 */
export const MenuEnforce = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/system/menu/{rolename}/enforce'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters['rolename'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: rolename'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const MenuEnforce_RAW_URL = function() {
  return '/system/menu/{rolename}/enforce'
}
export const MenuEnforce_TYPE = function() {
  return 'post'
}
export const MenuEnforceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/system/menu/{rolename}/enforce'
  path = path.replace('{rolename}', `${parameters['rolename']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建ws连接
 * request: CreateWsConnection
 * url: CreateWsConnectionURL
 * method: CreateWsConnection_TYPE
 * raw_url: CreateWsConnection_RAW_URL
 */
export const CreateWsConnection = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/ws/monitor'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const CreateWsConnection_RAW_URL = function() {
  return '/ws/monitor'
}
export const CreateWsConnection_TYPE = function() {
  return 'get'
}
export const CreateWsConnectionURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/ws/monitor'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 向云平台发送消息
 * request: SendMessage
 * url: SendMessageURL
 * method: SendMessage_TYPE
 * raw_url: SendMessage_RAW_URL
 * @param body - 消息内容
 */
export const SendMessage = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/send'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const SendMessage_RAW_URL = function() {
  return '/monitor/send'
}
export const SendMessage_TYPE = function() {
  return 'post'
}
export const SendMessageURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/send'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 设备对时指令
 * request: SendDeviceTimeMessage
 * url: SendDeviceTimeMessageURL
 * method: SendDeviceTimeMessage_TYPE
 * raw_url: SendDeviceTimeMessage_RAW_URL
 * @param body - 消息内容
 */
export const SendDeviceTimeMessage = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/senddevicetime'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const SendDeviceTimeMessage_RAW_URL = function() {
  return '/monitor/senddevicetime'
}
export const SendDeviceTimeMessage_TYPE = function() {
  return 'post'
}
export const SendDeviceTimeMessageURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/senddevicetime'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 上传文件(小于16M)
 * request: UploadFile
 * url: UploadFileURL
 * method: UploadFile_TYPE
 * raw_url: UploadFile_RAW_URL
 * @param file - 文件流
 */
export const UploadFile = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/file/upload'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'multipart/form-data'
  if (parameters['file'] !== undefined) {
    formData.append('file', parameters['file'])
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const UploadFile_RAW_URL = function() {
  return '/monitor/file/upload'
}
export const UploadFile_TYPE = function() {
  return 'post'
}
export const UploadFileURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/file/upload'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取文件
 * request: DownloadFile
 * url: DownloadFileURL
 * method: DownloadFile_TYPE
 * raw_url: DownloadFile_RAW_URL
 * @param id - 文件ID
 */
export const DownloadFile = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/file/download'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Accept'] = 'application/octet-stream'
  config.headers['Content-Type'] = 'application/json'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const DownloadFile_RAW_URL = function() {
  return '/monitor/file/download'
}
export const DownloadFile_TYPE = function() {
  return 'get'
}
export const DownloadFileURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/file/download'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备时间信息
 * request: GetDeviceTimes
 * url: GetDeviceTimesURL
 * method: GetDeviceTimes_TYPE
 * raw_url: GetDeviceTimes_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceTimes = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/device/times'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceTimes_RAW_URL = function() {
  return '/monitor/mon/device/times'
}
export const GetDeviceTimes_TYPE = function() {
  return 'get'
}
export const GetDeviceTimesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/device/times'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取注册信息
 * request: GetCurrentRegs
 * url: GetCurrentRegsURL
 * method: GetCurrentRegs_TYPE
 * raw_url: GetCurrentRegs_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCurrentRegs = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/regs/current'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentRegs_RAW_URL = function() {
  return '/monitor/mon/regs/current'
}
export const GetCurrentRegs_TYPE = function() {
  return 'get'
}
export const GetCurrentRegsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/regs/current'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除某个类型的设备
 * request: DeleteRelationDevice
 * url: DeleteRelationDeviceURL
 * method: DeleteRelationDevice_TYPE
 * raw_url: DeleteRelationDevice_RAW_URL
 * @param body - 设备属性参数
 */
export const DeleteRelationDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/regs/current'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteRelationDevice_RAW_URL = function() {
  return '/monitor/mon/regs/current'
}
export const DeleteRelationDevice_TYPE = function() {
  return 'delete'
}
export const DeleteRelationDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/regs/current'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史注册信息
 * request: GetHistoryRegs
 * url: GetHistoryRegsURL
 * method: GetHistoryRegs_TYPE
 * raw_url: GetHistoryRegs_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryRegs = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/regs/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryRegs_RAW_URL = function() {
  return '/monitor/mon/regs/history'
}
export const GetHistoryRegs_TYPE = function() {
  return 'get'
}
export const GetHistoryRegsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/regs/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取数据信息
 * request: GetCurrentDatas
 * url: GetCurrentDatasURL
 * method: GetCurrentDatas_TYPE
 * raw_url: GetCurrentDatas_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCurrentDatas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/datas/current'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentDatas_RAW_URL = function() {
  return '/monitor/mon/datas/current'
}
export const GetCurrentDatas_TYPE = function() {
  return 'get'
}
export const GetCurrentDatasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/datas/current'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史数据信息
 * request: GetHistoryDatas
 * url: GetHistoryDatasURL
 * method: GetHistoryDatas_TYPE
 * raw_url: GetHistoryDatas_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryDatas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/datas/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryDatas_RAW_URL = function() {
  return '/monitor/mon/datas/history'
}
export const GetHistoryDatas_TYPE = function() {
  return 'get'
}
export const GetHistoryDatasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/datas/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个设备历史数据信息
 * request: GetHistorySingleDatas
 * url: GetHistorySingleDatasURL
 * method: GetHistorySingleDatas_TYPE
 * raw_url: GetHistorySingleDatas_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistorySingleDatas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/single/datas/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistorySingleDatas_RAW_URL = function() {
  return '/monitor/mon/single/datas/history'
}
export const GetHistorySingleDatas_TYPE = function() {
  return 'get'
}
export const GetHistorySingleDatasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/single/datas/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取电流历史数据信息
 * request: GetHistoryGroundDatas
 * url: GetHistoryGroundDatasURL
 * method: GetHistoryGroundDatas_TYPE
 * raw_url: GetHistoryGroundDatas_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryGroundDatas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/ground/datas/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryGroundDatas_RAW_URL = function() {
  return '/monitor/mon/ground/datas/history'
}
export const GetHistoryGroundDatas_TYPE = function() {
  return 'get'
}
export const GetHistoryGroundDatasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/ground/datas/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取电流历史数据信息
 * request: GetHistoryGroundCurrents
 * url: GetHistoryGroundCurrentsURL
 * method: GetHistoryGroundCurrents_TYPE
 * raw_url: GetHistoryGroundCurrents_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryGroundCurrents = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/ground/current/datas/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryGroundCurrents_RAW_URL = function() {
  return '/monitor/mon/ground/current/datas/history'
}
export const GetHistoryGroundCurrents_TYPE = function() {
  return 'get'
}
export const GetHistoryGroundCurrentsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/ground/current/datas/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取事件信息
 * request: GetCurrentEvents
 * url: GetCurrentEventsURL
 * method: GetCurrentEvents_TYPE
 * raw_url: GetCurrentEvents_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCurrentEvents = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/events/current'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentEvents_RAW_URL = function() {
  return '/monitor/mon/events/current'
}
export const GetCurrentEvents_TYPE = function() {
  return 'get'
}
export const GetCurrentEventsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/events/current'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史事件信息
 * request: GetHistoryEvents
 * url: GetHistoryEventsURL
 * method: GetHistoryEvents_TYPE
 * raw_url: GetHistoryEvents_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryEvents = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/mon/events/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryEvents_RAW_URL = function() {
  return '/monitor/mon/events/history'
}
export const GetHistoryEvents_TYPE = function() {
  return 'get'
}
export const GetHistoryEventsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/mon/events/history'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个过程站
 * request: GetLogicalDevice
 * url: GetLogicalDeviceURL
 * method: GetLogicalDevice_TYPE
 * raw_url: GetLogicalDevice_RAW_URL
 * @param code - 过程站编码
 */
export const GetLogicalDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/logicaldevice/{code}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetLogicalDevice_RAW_URL = function() {
  return '/monitor/logicaldevice/{code}'
}
export const GetLogicalDevice_TYPE = function() {
  return 'get'
}
export const GetLogicalDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/logicaldevice/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除单个过程站
 * request: DeleteLogicalDevice
 * url: DeleteLogicalDeviceURL
 * method: DeleteLogicalDevice_TYPE
 * raw_url: DeleteLogicalDevice_RAW_URL
 * @param code - 过程站编码
 */
export const DeleteLogicalDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/logicaldevice/{code}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteLogicalDevice_RAW_URL = function() {
  return '/monitor/logicaldevice/{code}'
}
export const DeleteLogicalDevice_TYPE = function() {
  return 'delete'
}
export const DeleteLogicalDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/logicaldevice/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑单个过程站信息
 * request: UpdateLogicalDevice
 * url: UpdateLogicalDeviceURL
 * method: UpdateLogicalDevice_TYPE
 * raw_url: UpdateLogicalDevice_RAW_URL
 * @param code - 过程站编码
 * @param body - 过程站参数
 */
export const UpdateLogicalDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/logicaldevice/{code}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateLogicalDevice_RAW_URL = function() {
  return '/monitor/logicaldevice/{code}'
}
export const UpdateLogicalDevice_TYPE = function() {
  return 'put'
}
export const UpdateLogicalDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/logicaldevice/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建单个过程站
 * request: CreateLogicalDevice
 * url: CreateLogicalDeviceURL
 * method: CreateLogicalDevice_TYPE
 * raw_url: CreateLogicalDevice_RAW_URL
 * @param body - 过程站参数
 */
export const CreateLogicalDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/logicaldevice'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateLogicalDevice_RAW_URL = function() {
  return '/monitor/logicaldevice'
}
export const CreateLogicalDevice_TYPE = function() {
  return 'post'
}
export const CreateLogicalDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/logicaldevice'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 批量添加过程站
 * request: AddBatchLogicalDevice
 * url: AddBatchLogicalDeviceURL
 * method: AddBatchLogicalDevice_TYPE
 * raw_url: AddBatchLogicalDevice_RAW_URL
 * @param count - 数量
 * @param body - 过程站参数
 */
export const AddBatchLogicalDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/logicaldevice/batch'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['count'] !== undefined) {
    queryParameters['count'] = parameters['count']
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const AddBatchLogicalDevice_RAW_URL = function() {
  return '/monitor/logicaldevice/batch'
}
export const AddBatchLogicalDevice_TYPE = function() {
  return 'post'
}
export const AddBatchLogicalDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/logicaldevice/batch'
  if (parameters['count'] !== undefined) {
    queryParameters['count'] = parameters['count']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 批量删除过程站
 * request: DeleteBatchLogicalDevice
 * url: DeleteBatchLogicalDeviceURL
 * method: DeleteBatchLogicalDevice_TYPE
 * raw_url: DeleteBatchLogicalDevice_RAW_URL
 * @param body - 过程站参数
 */
export const DeleteBatchLogicalDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/logicaldevice/batch'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteBatchLogicalDevice_RAW_URL = function() {
  return '/monitor/logicaldevice/batch'
}
export const DeleteBatchLogicalDevice_TYPE = function() {
  return 'delete'
}
export const DeleteBatchLogicalDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/logicaldevice/batch'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取获取过程站列表
 * request: GetLogicalDevices
 * url: GetLogicalDevicesURL
 * method: GetLogicalDevices_TYPE
 * raw_url: GetLogicalDevices_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetLogicalDevices = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/logicaldevices'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetLogicalDevices_RAW_URL = function() {
  return '/monitor/logicaldevices'
}
export const GetLogicalDevices_TYPE = function() {
  return 'get'
}
export const GetLogicalDevicesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/logicaldevices'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 模拟告警事件触发演练
 * request: SimulateTriggerMessage
 * url: SimulateTriggerMessageURL
 * method: SimulateTriggerMessage_TYPE
 * raw_url: SimulateTriggerMessage_RAW_URL
 * @param spcname - 自定义名称
 * @param cardId - 设备卡ID
 * @param cableId - 设备ID
 * @param stValue - 模拟事件
 * @param code - 过程站编码
 */
export const SimulateTriggerMessage = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/simulate/status/trigger/message'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['spcname'] !== undefined) {
    queryParameters['spcname'] = parameters['spcname']
  }
  if (parameters['spcname'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: spcname'))
  }
  if (parameters['cardId'] !== undefined) {
    queryParameters['card_id'] = parameters['cardId']
  }
  if (parameters['cardId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: cardId'))
  }
  if (parameters['cableId'] !== undefined) {
    queryParameters['cable_id'] = parameters['cableId']
  }
  if (parameters['cableId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: cableId'))
  }
  if (parameters['stValue'] !== undefined) {
    queryParameters['st_value'] = parameters['stValue']
  }
  if (parameters['stValue'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: stValue'))
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const SimulateTriggerMessage_RAW_URL = function() {
  return '/monitor/simulate/status/trigger/message'
}
export const SimulateTriggerMessage_TYPE = function() {
  return 'post'
}
export const SimulateTriggerMessageURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/simulate/status/trigger/message'
  if (parameters['spcname'] !== undefined) {
    queryParameters['spcname'] = parameters['spcname']
  }
  if (parameters['cardId'] !== undefined) {
    queryParameters['card_id'] = parameters['cardId']
  }
  if (parameters['cableId'] !== undefined) {
    queryParameters['cable_id'] = parameters['cableId']
  }
  if (parameters['stValue'] !== undefined) {
    queryParameters['st_value'] = parameters['stValue']
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 保存设备状态信息
 * request: SaveDeviceStatusInfos
 * url: SaveDeviceStatusInfosURL
 * method: SaveDeviceStatusInfos_TYPE
 * raw_url: SaveDeviceStatusInfos_RAW_URL
 * @param body - 设备状态信息参数
 */
export const SaveDeviceStatusInfos = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/status/infos'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const SaveDeviceStatusInfos_RAW_URL = function() {
  return '/monitor/device/status/infos'
}
export const SaveDeviceStatusInfos_TYPE = function() {
  return 'post'
}
export const SaveDeviceStatusInfosURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/status/infos'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备状态信息
 * request: GetDeviceStatusInfos
 * url: GetDeviceStatusInfosURL
 * method: GetDeviceStatusInfos_TYPE
 * raw_url: GetDeviceStatusInfos_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceStatusInfos = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/status/infos'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceStatusInfos_RAW_URL = function() {
  return '/monitor/device/status/infos'
}
export const GetDeviceStatusInfos_TYPE = function() {
  return 'get'
}
export const GetDeviceStatusInfosURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/status/infos'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个设备类型的详细信息
 * request: GetDeviceType
 * url: GetDeviceTypeURL
 * method: GetDeviceType_TYPE
 * raw_url: GetDeviceType_RAW_URL
 * @param id - 设备类型ID
 */
export const GetDeviceType = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/type/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceType_RAW_URL = function() {
  return '/monitor/device/type/{id}'
}
export const GetDeviceType_TYPE = function() {
  return 'get'
}
export const GetDeviceTypeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/type/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑单个设备类型信息
 * request: UpdateDeviceType
 * url: UpdateDeviceTypeURL
 * method: UpdateDeviceType_TYPE
 * raw_url: UpdateDeviceType_RAW_URL
 * @param id - 设备类型ID
 * @param body - 设备类型参数
 */
export const UpdateDeviceType = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/type/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateDeviceType_RAW_URL = function() {
  return '/monitor/device/type/{id}'
}
export const UpdateDeviceType_TYPE = function() {
  return 'put'
}
export const UpdateDeviceTypeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/type/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 更新设备类型发布状态
 * request: UpdateDeviceTypePublishStatus
 * url: UpdateDeviceTypePublishStatusURL
 * method: UpdateDeviceTypePublishStatus_TYPE
 * raw_url: UpdateDeviceTypePublishStatus_RAW_URL
 * @param id - 设备类型ID
 * @param body - 设备类型参数
 */
export const UpdateDeviceTypePublishStatus = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/type/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateDeviceTypePublishStatus_RAW_URL = function() {
  return '/monitor/device/type/{id}'
}
export const UpdateDeviceTypePublishStatus_TYPE = function() {
  return 'patch'
}
export const UpdateDeviceTypePublishStatusURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/type/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除单个设备类型
 * request: DeleteDeviceType
 * url: DeleteDeviceTypeURL
 * method: DeleteDeviceType_TYPE
 * raw_url: DeleteDeviceType_RAW_URL
 * @param id - 设备类型ID
 */
export const DeleteDeviceType = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/type/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteDeviceType_RAW_URL = function() {
  return '/monitor/device/type/{id}'
}
export const DeleteDeviceType_TYPE = function() {
  return 'delete'
}
export const DeleteDeviceTypeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/type/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建单个设备类型
 * request: CreateDeviceType
 * url: CreateDeviceTypeURL
 * method: CreateDeviceType_TYPE
 * raw_url: CreateDeviceType_RAW_URL
 * @param body - 设备类型参数
 */
export const CreateDeviceType = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/type'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateDeviceType_RAW_URL = function() {
  return '/monitor/device/type'
}
export const CreateDeviceType_TYPE = function() {
  return 'post'
}
export const CreateDeviceTypeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/type'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备类型列表
 * request: GetDeviceTypes
 * url: GetDeviceTypesURL
 * method: GetDeviceTypes_TYPE
 * raw_url: GetDeviceTypes_RAW_URL
 * @param sort - 排序方式
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceTypes = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/types'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceTypes_RAW_URL = function() {
  return '/monitor/device/types'
}
export const GetDeviceTypes_TYPE = function() {
  return 'get'
}
export const GetDeviceTypesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/types'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个设备属性的详细信息
 * request: GetDeviceAttribute
 * url: GetDeviceAttributeURL
 * method: GetDeviceAttribute_TYPE
 * raw_url: GetDeviceAttribute_RAW_URL
 * @param id - 设备属性ID
 */
export const GetDeviceAttribute = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/attribute/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceAttribute_RAW_URL = function() {
  return '/monitor/device/attribute/{id}'
}
export const GetDeviceAttribute_TYPE = function() {
  return 'get'
}
export const GetDeviceAttributeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/attribute/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑单个设备属性信息
 * request: UpdateDeviceAttribute
 * url: UpdateDeviceAttributeURL
 * method: UpdateDeviceAttribute_TYPE
 * raw_url: UpdateDeviceAttribute_RAW_URL
 * @param id - 设备属性ID
 * @param body - 设备属性参数
 */
export const UpdateDeviceAttribute = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/attribute/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateDeviceAttribute_RAW_URL = function() {
  return '/monitor/device/attribute/{id}'
}
export const UpdateDeviceAttribute_TYPE = function() {
  return 'put'
}
export const UpdateDeviceAttributeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/attribute/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 更新设备属性发布状态
 * request: UpdateDeviceAttributePublishStatus
 * url: UpdateDeviceAttributePublishStatusURL
 * method: UpdateDeviceAttributePublishStatus_TYPE
 * raw_url: UpdateDeviceAttributePublishStatus_RAW_URL
 * @param id - 设备属性ID
 * @param body - 设备属性参数
 */
export const UpdateDeviceAttributePublishStatus = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/attribute/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateDeviceAttributePublishStatus_RAW_URL = function() {
  return '/monitor/device/attribute/{id}'
}
export const UpdateDeviceAttributePublishStatus_TYPE = function() {
  return 'patch'
}
export const UpdateDeviceAttributePublishStatusURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/attribute/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除单个设备属性
 * request: DeleteDeviceAttribute
 * url: DeleteDeviceAttributeURL
 * method: DeleteDeviceAttribute_TYPE
 * raw_url: DeleteDeviceAttribute_RAW_URL
 * @param id - 设备属性ID
 */
export const DeleteDeviceAttribute = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/attribute/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteDeviceAttribute_RAW_URL = function() {
  return '/monitor/device/attribute/{id}'
}
export const DeleteDeviceAttribute_TYPE = function() {
  return 'delete'
}
export const DeleteDeviceAttributeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/attribute/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建单个设备属性
 * request: CreateDeviceAttribute
 * url: CreateDeviceAttributeURL
 * method: CreateDeviceAttribute_TYPE
 * raw_url: CreateDeviceAttribute_RAW_URL
 * @param body - 设备属性参数
 */
export const CreateDeviceAttribute = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/attribute'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateDeviceAttribute_RAW_URL = function() {
  return '/monitor/device/attribute'
}
export const CreateDeviceAttribute_TYPE = function() {
  return 'post'
}
export const CreateDeviceAttributeURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/attribute'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备属性列表
 * request: GetDeviceAttributes
 * url: GetDeviceAttributesURL
 * method: GetDeviceAttributes_TYPE
 * raw_url: GetDeviceAttributes_RAW_URL
 * @param sort - 排序方式
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceAttributes = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/attributes'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceAttributes_RAW_URL = function() {
  return '/monitor/device/attributes'
}
export const GetDeviceAttributes_TYPE = function() {
  return 'get'
}
export const GetDeviceAttributesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/attributes'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 接受云平台发送的消息
 * request: ReceiveVideoMessage
 * url: ReceiveVideoMessageURL
 * method: ReceiveVideoMessage_TYPE
 * raw_url: ReceiveVideoMessage_RAW_URL
 * @param body - 消息内容
 */
export const ReceiveVideoMessage = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/receive'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const ReceiveVideoMessage_RAW_URL = function() {
  return '/monitor/video/receive'
}
export const ReceiveVideoMessage_TYPE = function() {
  return 'post'
}
export const ReceiveVideoMessageURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/receive'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取视频设备列表
 * request: ListIPC
 * url: ListIPCURL
 * method: ListIPC_TYPE
 * raw_url: ListIPC_RAW_URL
 * @param code - 配电所编码
 */
export const ListIPC = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/list'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const ListIPC_RAW_URL = function() {
  return '/monitor/video/list'
}
export const ListIPC_TYPE = function() {
  return 'get'
}
export const ListIPCURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/list'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史视频列表
 * request: ListIPCHistory
 * url: ListIPCHistoryURL
 * method: ListIPCHistory_TYPE
 * raw_url: ListIPCHistory_RAW_URL
 * @param code - 配电所编码
 * @param nvrId - IPC设备ID
 * @param channel - 摄像头ID
 * @param startTime - 开始时间 例2019-01-01 00:00:00
 * @param endTime - 结束时间 例2019-01-01 23:59:59
 */
export const ListIPCHistory = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/list/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['nvrId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: nvrId'))
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters['channel'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: channel'))
  }
  if (parameters['startTime'] !== undefined) {
    queryParameters['start_time'] = parameters['startTime']
  }
  if (parameters['startTime'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: startTime'))
  }
  if (parameters['endTime'] !== undefined) {
    queryParameters['end_time'] = parameters['endTime']
  }
  if (parameters['endTime'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: endTime'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const ListIPCHistory_RAW_URL = function() {
  return '/monitor/video/list/history'
}
export const ListIPCHistory_TYPE = function() {
  return 'get'
}
export const ListIPCHistoryURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/list/history'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters['startTime'] !== undefined) {
    queryParameters['start_time'] = parameters['startTime']
  }
  if (parameters['endTime'] !== undefined) {
    queryParameters['end_time'] = parameters['endTime']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取视频流URL和Token
 * request: PlayLiveStream
 * url: PlayLiveStreamURL
 * method: PlayLiveStream_TYPE
 * raw_url: PlayLiveStream_RAW_URL
 * @param code - 配电所编码
 * @param nvrId - IPC设备ID
 * @param channel - 摄像头ID
 */
export const PlayLiveStream = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/stream/live'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['nvrId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: nvrId'))
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters['channel'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: channel'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const PlayLiveStream_RAW_URL = function() {
  return '/monitor/video/stream/live'
}
export const PlayLiveStream_TYPE = function() {
  return 'get'
}
export const PlayLiveStreamURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/stream/live'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取视频流URL和Token
 * request: PlayHistoryStream
 * url: PlayHistoryStreamURL
 * method: PlayHistoryStream_TYPE
 * raw_url: PlayHistoryStream_RAW_URL
 * @param code - 配电所编码
 * @param nvrId - IPC设备ID
 * @param channel - 摄像头ID
 * @param startTime - 开始时间 例2019-01-01 15:03:05
 * @param endTime - 结束时间 例2019-01-10 15:03:05
 */
export const PlayHistoryStream = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/stream/history'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['nvrId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: nvrId'))
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters['channel'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: channel'))
  }
  if (parameters['startTime'] !== undefined) {
    queryParameters['start_time'] = parameters['startTime']
  }
  if (parameters['startTime'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: startTime'))
  }
  if (parameters['endTime'] !== undefined) {
    queryParameters['end_time'] = parameters['endTime']
  }
  if (parameters['endTime'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: endTime'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const PlayHistoryStream_RAW_URL = function() {
  return '/monitor/video/stream/history'
}
export const PlayHistoryStream_TYPE = function() {
  return 'get'
}
export const PlayHistoryStreamURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/stream/history'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters['startTime'] !== undefined) {
    queryParameters['start_time'] = parameters['startTime']
  }
  if (parameters['endTime'] !== undefined) {
    queryParameters['end_time'] = parameters['endTime']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 控制网络摄像机
 * request: ControlIPC
 * url: ControlIPCURL
 * method: ControlIPC_TYPE
 * raw_url: ControlIPC_RAW_URL
 * @param code - 配电所编码
 * @param nvrId - IPC设备ID
 * @param channel - 摄像头ID
 * @param command - 控制指令
 */
export const ControlIPC = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/control'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['nvrId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: nvrId'))
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters['channel'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: channel'))
  }
  if (parameters['command'] !== undefined) {
    queryParameters['command'] = parameters['command']
  }
  if (parameters['command'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: command'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const ControlIPC_RAW_URL = function() {
  return '/monitor/video/control'
}
export const ControlIPC_TYPE = function() {
  return 'post'
}
export const ControlIPCURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/control'
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['nvrId'] !== undefined) {
    queryParameters['nvr_id'] = parameters['nvrId']
  }
  if (parameters['channel'] !== undefined) {
    queryParameters['channel'] = parameters['channel']
  }
  if (parameters['command'] !== undefined) {
    queryParameters['command'] = parameters['command']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个视频设备
 * request: GetVideoDevice
 * url: GetVideoDeviceURL
 * method: GetVideoDevice_TYPE
 * raw_url: GetVideoDevice_RAW_URL
 * @param code - 视频设备编码
 */
export const GetVideoDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/videodevice/{code}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetVideoDevice_RAW_URL = function() {
  return '/monitor/videodevice/{code}'
}
export const GetVideoDevice_TYPE = function() {
  return 'get'
}
export const GetVideoDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/videodevice/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除单个视频设备
 * request: DeleteVideoDevice
 * url: DeleteVideoDeviceURL
 * method: DeleteVideoDevice_TYPE
 * raw_url: DeleteVideoDevice_RAW_URL
 * @param code - 视频设备编码
 */
export const DeleteVideoDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/videodevice/{code}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteVideoDevice_RAW_URL = function() {
  return '/monitor/videodevice/{code}'
}
export const DeleteVideoDevice_TYPE = function() {
  return 'delete'
}
export const DeleteVideoDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/videodevice/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑视频设备信息
 * request: UpdateVideoDevice
 * url: UpdateVideoDeviceURL
 * method: UpdateVideoDevice_TYPE
 * raw_url: UpdateVideoDevice_RAW_URL
 * @param code - 视频设备编码
 * @param body - 视频设备参数
 */
export const UpdateVideoDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/videodevice/{code}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateVideoDevice_RAW_URL = function() {
  return '/monitor/videodevice/{code}'
}
export const UpdateVideoDevice_TYPE = function() {
  return 'put'
}
export const UpdateVideoDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/videodevice/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建视频设备
 * request: CreateVideoDevice
 * url: CreateVideoDeviceURL
 * method: CreateVideoDevice_TYPE
 * raw_url: CreateVideoDevice_RAW_URL
 * @param body - 视频设备参数
 */
export const CreateVideoDevice = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/videodevice'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateVideoDevice_RAW_URL = function() {
  return '/monitor/videodevice'
}
export const CreateVideoDevice_TYPE = function() {
  return 'post'
}
export const CreateVideoDeviceURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/videodevice'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取视频设备列表
 * request: GetVideoDevices
 * url: GetVideoDevicesURL
 * method: GetVideoDevices_TYPE
 * raw_url: GetVideoDevices_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetVideoDevices = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/videodevices'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetVideoDevices_RAW_URL = function() {
  return '/monitor/videodevices'
}
export const GetVideoDevices_TYPE = function() {
  return 'get'
}
export const GetVideoDevicesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/videodevices'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑隧道回路绑定关系
 * request: UpdateTunnelLoopRelation
 * url: UpdateTunnelLoopRelationURL
 * method: UpdateTunnelLoopRelation_TYPE
 * raw_url: UpdateTunnelLoopRelation_RAW_URL
 * @param id - 隧道回路绑定关系ID
 * @param body - 隧道回路绑定关系参数
 */
export const UpdateTunnelLoopRelation = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnelLoopRelation/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateTunnelLoopRelation_RAW_URL = function() {
  return '/monitor/tunnelLoopRelation/{id}'
}
export const UpdateTunnelLoopRelation_TYPE = function() {
  return 'put'
}
export const UpdateTunnelLoopRelationURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnelLoopRelation/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除隧道回路绑定关系
 * request: DeleteTunnelLoopRelation
 * url: DeleteTunnelLoopRelationURL
 * method: DeleteTunnelLoopRelation_TYPE
 * raw_url: DeleteTunnelLoopRelation_RAW_URL
 * @param id - 隧道回路绑定关系ID
 */
export const DeleteTunnelLoopRelation = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnelLoopRelation/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteTunnelLoopRelation_RAW_URL = function() {
  return '/monitor/tunnelLoopRelation/{id}'
}
export const DeleteTunnelLoopRelation_TYPE = function() {
  return 'delete'
}
export const DeleteTunnelLoopRelationURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnelLoopRelation/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建隧道回路绑定关系
 * request: CreateTunnelLoopRelation
 * url: CreateTunnelLoopRelationURL
 * method: CreateTunnelLoopRelation_TYPE
 * raw_url: CreateTunnelLoopRelation_RAW_URL
 * @param body - 隧道回路绑定关系参数
 */
export const CreateTunnelLoopRelation = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnelLoopRelation'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateTunnelLoopRelation_RAW_URL = function() {
  return '/monitor/tunnelLoopRelation'
}
export const CreateTunnelLoopRelation_TYPE = function() {
  return 'post'
}
export const CreateTunnelLoopRelationURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnelLoopRelation'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取隧道回路绑定关系列表
 * request: GetTunnelLoopRelations
 * url: GetTunnelLoopRelationsURL
 * method: GetTunnelLoopRelations_TYPE
 * raw_url: GetTunnelLoopRelations_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTunnelLoopRelations = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnelLoopRelations'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetTunnelLoopRelations_RAW_URL = function() {
  return '/monitor/tunnelLoopRelations'
}
export const GetTunnelLoopRelations_TYPE = function() {
  return 'get'
}
export const GetTunnelLoopRelationsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnelLoopRelations'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 计算环流回路信息（简单）
 * request: CircuitSimple
 * url: CircuitSimpleURL
 * method: CircuitSimple_TYPE
 * raw_url: CircuitSimple_RAW_URL
 * @param body - 环流回路信息参数
 */
export const CircuitSimple = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/circuit'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CircuitSimple_RAW_URL = function() {
  return '/monitor/circuit'
}
export const CircuitSimple_TYPE = function() {
  return 'post'
}
export const CircuitSimpleURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/circuit'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取当前告警信息
 * request: GetCurrentAlert
 * url: GetCurrentAlertURL
 * method: GetCurrentAlert_TYPE
 * raw_url: GetCurrentAlert_RAW_URL
 * @param id - 告警ID
 */
export const GetCurrentAlert = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/alert/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentAlert_RAW_URL = function() {
  return '/monitor/alert/{id}'
}
export const GetCurrentAlert_TYPE = function() {
  return 'get'
}
export const GetCurrentAlertURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/alert/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史告警信息
 * request: GetHistoryAlert
 * url: GetHistoryAlertURL
 * method: GetHistoryAlert_TYPE
 * raw_url: GetHistoryAlert_RAW_URL
 * @param id - 告警ID
 */
export const GetHistoryAlert = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/alert/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryAlert_RAW_URL = function() {
  return '/monitor/alert/{id}'
}
export const GetHistoryAlert_TYPE = function() {
  return 'patch'
}
export const GetHistoryAlertURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/alert/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 处理当前告警信息
 * request: HandleCurrentAlert
 * url: HandleCurrentAlertURL
 * method: HandleCurrentAlert_TYPE
 * raw_url: HandleCurrentAlert_RAW_URL
 * @param id - 告警ID
 * @param handleInfo - 处理信息
 * @param shortCut - 快速处理
 */
export const HandleCurrentAlert = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/alert/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['handleInfo'] !== undefined) {
    queryParameters['handle_info'] = parameters['handleInfo']
  }
  if (parameters['handleInfo'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: handleInfo'))
  }
  if (parameters['shortCut'] !== undefined) {
    queryParameters['short_cut'] = parameters['shortCut']
  }
  if (parameters['shortCut'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: shortCut'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const HandleCurrentAlert_RAW_URL = function() {
  return '/monitor/alert/{id}'
}
export const HandleCurrentAlert_TYPE = function() {
  return 'put'
}
export const HandleCurrentAlertURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/alert/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['handleInfo'] !== undefined) {
    queryParameters['handle_info'] = parameters['handleInfo']
  }
  if (parameters['shortCut'] !== undefined) {
    queryParameters['short_cut'] = parameters['shortCut']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取当前告警信息列表
 * request: GetCurrentAlerts
 * url: GetCurrentAlertsURL
 * method: GetCurrentAlerts_TYPE
 * raw_url: GetCurrentAlerts_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCurrentAlerts = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/alerts'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCurrentAlerts_RAW_URL = function() {
  return '/monitor/alerts'
}
export const GetCurrentAlerts_TYPE = function() {
  return 'get'
}
export const GetCurrentAlertsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/alerts'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史告警信息列表
 * request: GetHistoryAlerts
 * url: GetHistoryAlertsURL
 * method: GetHistoryAlerts_TYPE
 * raw_url: GetHistoryAlerts_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryAlerts = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/alerts'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryAlerts_RAW_URL = function() {
  return '/monitor/alerts'
}
export const GetHistoryAlerts_TYPE = function() {
  return 'patch'
}
export const GetHistoryAlertsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/alerts'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑设备卡集合名称
 * request: UpdateRelationDeviceCardName
 * url: UpdateRelationDeviceCardNameURL
 * method: UpdateRelationDeviceCardName_TYPE
 * raw_url: UpdateRelationDeviceCardName_RAW_URL
 * @param cardId - 设备卡集合ID
 * @param cardName - 设备卡集合名称
 * @param code - 过程站编码
 */
export const UpdateRelationDeviceCardName = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/relationUpdate/cardName'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['cardId'] !== undefined) {
    queryParameters['card_id'] = parameters['cardId']
  }
  if (parameters['cardId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: cardId'))
  }
  if (parameters['cardName'] !== undefined) {
    queryParameters['card_name'] = parameters['cardName']
  }
  if (parameters['cardName'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: cardName'))
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateRelationDeviceCardName_RAW_URL = function() {
  return '/monitor/relationUpdate/cardName'
}
export const UpdateRelationDeviceCardName_TYPE = function() {
  return 'put'
}
export const UpdateRelationDeviceCardNameURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/relationUpdate/cardName'
  if (parameters['cardId'] !== undefined) {
    queryParameters['card_id'] = parameters['cardId']
  }
  if (parameters['cardName'] !== undefined) {
    queryParameters['card_name'] = parameters['cardName']
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑设备属性(告警阈值)
 * request: UpdateRelationDeviceInfo
 * url: UpdateRelationDeviceInfoURL
 * method: UpdateRelationDeviceInfo_TYPE
 * raw_url: UpdateRelationDeviceInfo_RAW_URL
 * @param spcname - 自定义名称
 * @param cardId - 设备类型ID
 * @param code - 过程站编码
 * @param body - 设备参数
 */
export const UpdateRelationDeviceInfo = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/relation'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['spcname'] !== undefined) {
    queryParameters['spcname'] = parameters['spcname']
  }
  if (parameters['spcname'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: spcname'))
  }
  if (parameters['cardId'] !== undefined) {
    queryParameters['card_id'] = parameters['cardId']
  }
  if (parameters['cardId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: cardId'))
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateRelationDeviceInfo_RAW_URL = function() {
  return '/monitor/relation'
}
export const UpdateRelationDeviceInfo_TYPE = function() {
  return 'put'
}
export const UpdateRelationDeviceInfoURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/relation'
  if (parameters['spcname'] !== undefined) {
    queryParameters['spcname'] = parameters['spcname']
  }
  if (parameters['cardId'] !== undefined) {
    queryParameters['card_id'] = parameters['cardId']
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑设备状态
 * request: UpdateRelationDeviceStatus
 * url: UpdateRelationDeviceStatusURL
 * method: UpdateRelationDeviceStatus_TYPE
 * raw_url: UpdateRelationDeviceStatus_RAW_URL
 * @param id - 设备ID
 * @param status - 设备状态
 * @param tunnelName - 隧道名称
 * @param deviceName - 设备名称
 * @param deviceType - 设备类型
 */
export const UpdateRelationDeviceStatus = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/relation'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status']
  }
  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: status'))
  }
  if (parameters['tunnelName'] !== undefined) {
    queryParameters['tunnel_name'] = parameters['tunnelName']
  }
  if (parameters['tunnelName'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: tunnelName'))
  }
  if (parameters['deviceName'] !== undefined) {
    queryParameters['device_name'] = parameters['deviceName']
  }
  if (parameters['deviceName'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: deviceName'))
  }
  if (parameters['deviceType'] !== undefined) {
    queryParameters['device_type'] = parameters['deviceType']
  }
  if (parameters['deviceType'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: deviceType'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateRelationDeviceStatus_RAW_URL = function() {
  return '/monitor/relation'
}
export const UpdateRelationDeviceStatus_TYPE = function() {
  return 'patch'
}
export const UpdateRelationDeviceStatusURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/relation'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status']
  }
  if (parameters['tunnelName'] !== undefined) {
    queryParameters['tunnel_name'] = parameters['tunnelName']
  }
  if (parameters['deviceName'] !== undefined) {
    queryParameters['device_name'] = parameters['deviceName']
  }
  if (parameters['deviceType'] !== undefined) {
    queryParameters['device_type'] = parameters['deviceType']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 更新隧道监控点摄像头绑定关系
 * request: UpdateTunnelMonitorInfo
 * url: UpdateTunnelMonitorInfoURL
 * method: UpdateTunnelMonitorInfo_TYPE
 * raw_url: UpdateTunnelMonitorInfo_RAW_URL
 * @param name - 隧道名称
 * @param body - 隧道监控点信息参数
 */
export const UpdateTunnelMonitorInfo = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/relationvideo/{name}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters['name'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: name'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateTunnelMonitorInfo_RAW_URL = function() {
  return '/monitor/relationvideo/{name}'
}
export const UpdateTunnelMonitorInfo_TYPE = function() {
  return 'put'
}
export const UpdateTunnelMonitorInfoURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/relationvideo/{name}'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除隧道监控点摄像头绑定关系
 * request: DeleteTunnelMonitorInfo
 * url: DeleteTunnelMonitorInfoURL
 * method: DeleteTunnelMonitorInfo_TYPE
 * raw_url: DeleteTunnelMonitorInfo_RAW_URL
 * @param name - 隧道名称
 * @param monitorName - 监控点名称
 * @param cameraInfo - 
 */
export const DeleteTunnelMonitorInfo = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/relationvideo/{name}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters['name'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: name'))
  }
  if (parameters['monitorName'] !== undefined) {
    queryParameters['monitor_name'] = parameters['monitorName']
  }
  if (parameters['monitorName'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: monitorName'))
  }
  if (parameters['cameraInfo'] !== undefined) {
    body = parameters['cameraInfo']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteTunnelMonitorInfo_RAW_URL = function() {
  return '/monitor/relationvideo/{name}'
}
export const DeleteTunnelMonitorInfo_TYPE = function() {
  return 'delete'
}
export const DeleteTunnelMonitorInfoURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/relationvideo/{name}'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters['monitorName'] !== undefined) {
    queryParameters['monitor_name'] = parameters['monitorName']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取隧道监控点摄像头关系列表
 * request: GetTunnelMonitorInfos
 * url: GetTunnelMonitorInfosURL
 * method: GetTunnelMonitorInfos_TYPE
 * raw_url: GetTunnelMonitorInfos_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTunnelMonitorInfos = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/relationvideo/TunnelMonitorInfos'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetTunnelMonitorInfos_RAW_URL = function() {
  return '/monitor/relationvideo/TunnelMonitorInfos'
}
export const GetTunnelMonitorInfos_TYPE = function() {
  return 'get'
}
export const GetTunnelMonitorInfosURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/relationvideo/TunnelMonitorInfos'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑视频配置关系信息
 * request: UpdateVideoRelationShip
 * url: UpdateVideoRelationShipURL
 * method: UpdateVideoRelationShip_TYPE
 * raw_url: UpdateVideoRelationShip_RAW_URL
 * @param id - 视频配置关系id
 * @param body - 视频配置关系参数
 */
export const UpdateVideoRelationShip = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/RelationShip/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateVideoRelationShip_RAW_URL = function() {
  return '/monitor/video/RelationShip/{id}'
}
export const UpdateVideoRelationShip_TYPE = function() {
  return 'put'
}
export const UpdateVideoRelationShipURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/RelationShip/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除视频配置关系
 * request: DeleteVideoRelationShip
 * url: DeleteVideoRelationShipURL
 * method: DeleteVideoRelationShip_TYPE
 * raw_url: DeleteVideoRelationShip_RAW_URL
 * @param id - 视频配置关系id
 */
export const DeleteVideoRelationShip = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/RelationShip/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteVideoRelationShip_RAW_URL = function() {
  return '/monitor/video/RelationShip/{id}'
}
export const DeleteVideoRelationShip_TYPE = function() {
  return 'delete'
}
export const DeleteVideoRelationShipURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/RelationShip/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建视频配置关系
 * request: CreateVideoRelationShip
 * url: CreateVideoRelationShipURL
 * method: CreateVideoRelationShip_TYPE
 * raw_url: CreateVideoRelationShip_RAW_URL
 * @param body - 视频配置关系参数
 */
export const CreateVideoRelationShip = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/RelationShip'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateVideoRelationShip_RAW_URL = function() {
  return '/monitor/video/RelationShip'
}
export const CreateVideoRelationShip_TYPE = function() {
  return 'post'
}
export const CreateVideoRelationShipURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/RelationShip'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取视频配置关系列表
 * request: GetVideoRelationShips
 * url: GetVideoRelationShipsURL
 * method: GetVideoRelationShips_TYPE
 * raw_url: GetVideoRelationShips_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetVideoRelationShips = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/video/RelationShips'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetVideoRelationShips_RAW_URL = function() {
  return '/monitor/video/RelationShips'
}
export const GetVideoRelationShips_TYPE = function() {
  return 'get'
}
export const GetVideoRelationShipsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/video/RelationShips'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取操作日志列表
 * request: GetOperateLogs
 * url: GetOperateLogsURL
 * method: GetOperateLogs_TYPE
 * raw_url: GetOperateLogs_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetOperateLogs = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/operateLogs'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetOperateLogs_RAW_URL = function() {
  return '/monitor/operateLogs'
}
export const GetOperateLogs_TYPE = function() {
  return 'get'
}
export const GetOperateLogsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/operateLogs'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取动作记录列表
 * request: GetActionInfos
 * url: GetActionInfosURL
 * method: GetActionInfos_TYPE
 * raw_url: GetActionInfos_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetActionInfos = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/actionInfos'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetActionInfos_RAW_URL = function() {
  return '/monitor/actionInfos'
}
export const GetActionInfos_TYPE = function() {
  return 'get'
}
export const GetActionInfosURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/actionInfos'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取事件列表
 * request: GetIncidentInfos
 * url: GetIncidentInfosURL
 * method: GetIncidentInfos_TYPE
 * raw_url: GetIncidentInfos_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetIncidentInfos = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/incidentInfos'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetIncidentInfos_RAW_URL = function() {
  return '/monitor/incidentInfos'
}
export const GetIncidentInfos_TYPE = function() {
  return 'get'
}
export const GetIncidentInfosURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/incidentInfos'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备故障列表(按照设备类型统计)
 * request: GetTypeMalfunctions
 * url: GetTypeMalfunctionsURL
 * method: GetTypeMalfunctions_TYPE
 * raw_url: GetTypeMalfunctions_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTypeMalfunctions = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/statisTypeMalfunctions'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetTypeMalfunctions_RAW_URL = function() {
  return '/monitor/statisTypeMalfunctions'
}
export const GetTypeMalfunctions_TYPE = function() {
  return 'get'
}
export const GetTypeMalfunctionsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/statisTypeMalfunctions'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备故障列表(全部)
 * request: GetMalfunctions
 * url: GetMalfunctionsURL
 * method: GetMalfunctions_TYPE
 * raw_url: GetMalfunctions_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetMalfunctions = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/statisMalfunctions'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetMalfunctions_RAW_URL = function() {
  return '/monitor/statisMalfunctions'
}
export const GetMalfunctions_TYPE = function() {
  return 'get'
}
export const GetMalfunctionsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/statisMalfunctions'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备故障列表(按照隧道统计)
 * request: GetTunMalfunctions
 * url: GetTunMalfunctionsURL
 * method: GetTunMalfunctions_TYPE
 * raw_url: GetTunMalfunctions_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTunMalfunctions = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/statisTunMalfunctions'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetTunMalfunctions_RAW_URL = function() {
  return '/monitor/statisTunMalfunctions'
}
export const GetTunMalfunctions_TYPE = function() {
  return 'get'
}
export const GetTunMalfunctionsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/statisTunMalfunctions'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备详细信息列表(新)
 * request: GetDeviceDetailInfos
 * url: GetDeviceDetailInfosURL
 * method: GetDeviceDetailInfos_TYPE
 * raw_url: GetDeviceDetailInfos_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceDetailInfos = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceCableDetailInfos'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceDetailInfos_RAW_URL = function() {
  return '/monitor/deviceCableDetailInfos'
}
export const GetDeviceDetailInfos_TYPE = function() {
  return 'get'
}
export const GetDeviceDetailInfosURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceCableDetailInfos'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个设备指令的详细信息
 * request: GetDeviceCommand
 * url: GetDeviceCommandURL
 * method: GetDeviceCommand_TYPE
 * raw_url: GetDeviceCommand_RAW_URL
 * @param id - 设备类型ID
 */
export const GetDeviceCommand = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/command/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceCommand_RAW_URL = function() {
  return '/monitor/device/command/{id}'
}
export const GetDeviceCommand_TYPE = function() {
  return 'get'
}
export const GetDeviceCommandURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/command/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑单个设备控制指令信息
 * request: UpdateDeviceCommand
 * url: UpdateDeviceCommandURL
 * method: UpdateDeviceCommand_TYPE
 * raw_url: UpdateDeviceCommand_RAW_URL
 * @param id - 设备指令ID
 * @param body - 设备指令参数
 */
export const UpdateDeviceCommand = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/command/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateDeviceCommand_RAW_URL = function() {
  return '/monitor/device/command/{id}'
}
export const UpdateDeviceCommand_TYPE = function() {
  return 'put'
}
export const UpdateDeviceCommandURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/command/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除单个设备指令
 * request: DeleteDeviceCommand
 * url: DeleteDeviceCommandURL
 * method: DeleteDeviceCommand_TYPE
 * raw_url: DeleteDeviceCommand_RAW_URL
 * @param id - 设备指令ID
 */
export const DeleteDeviceCommand = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/command/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteDeviceCommand_RAW_URL = function() {
  return '/monitor/device/command/{id}'
}
export const DeleteDeviceCommand_TYPE = function() {
  return 'delete'
}
export const DeleteDeviceCommandURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/command/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建单个设备指令
 * request: CreateDeviceCommand
 * url: CreateDeviceCommandURL
 * method: CreateDeviceCommand_TYPE
 * raw_url: CreateDeviceCommand_RAW_URL
 * @param body - 设备指令参数
 */
export const CreateDeviceCommand = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/command'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateDeviceCommand_RAW_URL = function() {
  return '/monitor/device/command'
}
export const CreateDeviceCommand_TYPE = function() {
  return 'post'
}
export const CreateDeviceCommandURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/command'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备指令列表
 * request: GetDeviceCommands
 * url: GetDeviceCommandsURL
 * method: GetDeviceCommands_TYPE
 * raw_url: GetDeviceCommands_RAW_URL
 * @param sort - 排序方式
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceCommands = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/device/commands'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceCommands_RAW_URL = function() {
  return '/monitor/device/commands'
}
export const GetDeviceCommands_TYPE = function() {
  return 'get'
}
export const GetDeviceCommandsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/device/commands'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取单个隧道视图信息
 * request: GetSingleTunnelCanvas
 * url: GetSingleTunnelCanvasURL
 * method: GetSingleTunnelCanvas_TYPE
 * raw_url: GetSingleTunnelCanvas_RAW_URL
 * @param id - 隧道ID
 */
export const GetSingleTunnelCanvas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel/canvas/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetSingleTunnelCanvas_RAW_URL = function() {
  return '/monitor/tunnel/canvas/{id}'
}
export const GetSingleTunnelCanvas_TYPE = function() {
  return 'get'
}
export const GetSingleTunnelCanvasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel/canvas/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑隧道视图信息
 * request: UpdateTunnelCanvas
 * url: UpdateTunnelCanvasURL
 * method: UpdateTunnelCanvas_TYPE
 * raw_url: UpdateTunnelCanvas_RAW_URL
 * @param id - 隧道ID
 * @param body - 隧道视图参数
 */
export const UpdateTunnelCanvas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel/canvas/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateTunnelCanvas_RAW_URL = function() {
  return '/monitor/tunnel/canvas/{id}'
}
export const UpdateTunnelCanvas_TYPE = function() {
  return 'put'
}
export const UpdateTunnelCanvasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel/canvas/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除隧道视图信息
 * request: DeleteTunnelCanvas
 * url: DeleteTunnelCanvasURL
 * method: DeleteTunnelCanvas_TYPE
 * raw_url: DeleteTunnelCanvas_RAW_URL
 * @param id - 隧道ID
 */
export const DeleteTunnelCanvas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel/canvas/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteTunnelCanvas_RAW_URL = function() {
  return '/monitor/tunnel/canvas/{id}'
}
export const DeleteTunnelCanvas_TYPE = function() {
  return 'delete'
}
export const DeleteTunnelCanvasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel/canvas/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建隧道视图
 * request: CreateTunnelCanvas
 * url: CreateTunnelCanvasURL
 * method: CreateTunnelCanvas_TYPE
 * raw_url: CreateTunnelCanvas_RAW_URL
 * @param body - 隧道视图参数
 */
export const CreateTunnelCanvas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel/canvas'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateTunnelCanvas_RAW_URL = function() {
  return '/monitor/tunnel/canvas'
}
export const CreateTunnelCanvas_TYPE = function() {
  return 'post'
}
export const CreateTunnelCanvasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel/canvas'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取隧道视图列表
 * request: GetTunnelCanvas
 * url: GetTunnelCanvasURL
 * method: GetTunnelCanvas_TYPE
 * raw_url: GetTunnelCanvas_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTunnelCanvas = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel/canvases'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetTunnelCanvas_RAW_URL = function() {
  return '/monitor/tunnel/canvases'
}
export const GetTunnelCanvas_TYPE = function() {
  return 'get'
}
export const GetTunnelCanvasURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel/canvases'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑线路信息
 * request: UpdateRoute
 * url: UpdateRouteURL
 * method: UpdateRoute_TYPE
 * raw_url: UpdateRoute_RAW_URL
 * @param id - 线路信息ID
 * @param body - 线路信息参数
 */
export const UpdateRoute = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/route/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateRoute_RAW_URL = function() {
  return '/monitor/route/{id}'
}
export const UpdateRoute_TYPE = function() {
  return 'put'
}
export const UpdateRouteURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/route/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除线路信息
 * request: DeleteRoute
 * url: DeleteRouteURL
 * method: DeleteRoute_TYPE
 * raw_url: DeleteRoute_RAW_URL
 * @param id - 线路信息ID
 */
export const DeleteRoute = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/route/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteRoute_RAW_URL = function() {
  return '/monitor/route/{id}'
}
export const DeleteRoute_TYPE = function() {
  return 'delete'
}
export const DeleteRouteURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/route/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建线路信息
 * request: CreateRoute
 * url: CreateRouteURL
 * method: CreateRoute_TYPE
 * raw_url: CreateRoute_RAW_URL
 * @param body - 线路信息参数
 */
export const CreateRoute = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/route'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateRoute_RAW_URL = function() {
  return '/monitor/route'
}
export const CreateRoute_TYPE = function() {
  return 'post'
}
export const CreateRouteURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/route'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 导入多条线路信息
 * request: InsertRoutes
 * url: InsertRoutesURL
 * method: InsertRoutes_TYPE
 * raw_url: InsertRoutes_RAW_URL
 * @param body - 线路信息参数
 */
export const InsertRoutes = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/route'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const InsertRoutes_RAW_URL = function() {
  return '/monitor/route'
}
export const InsertRoutes_TYPE = function() {
  return 'patch'
}
export const InsertRoutesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/route'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取线路信息列表
 * request: GetRoutes
 * url: GetRoutesURL
 * method: GetRoutes_TYPE
 * raw_url: GetRoutes_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetRoutes = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/routes'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetRoutes_RAW_URL = function() {
  return '/monitor/routes'
}
export const GetRoutes_TYPE = function() {
  return 'get'
}
export const GetRoutesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/routes'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑隧道信息
 * request: UpdateTunnel
 * url: UpdateTunnelURL
 * method: UpdateTunnel_TYPE
 * raw_url: UpdateTunnel_RAW_URL
 * @param id - 隧道信息ID
 * @param body - 隧道信息参数
 */
export const UpdateTunnel = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateTunnel_RAW_URL = function() {
  return '/monitor/tunnel/{id}'
}
export const UpdateTunnel_TYPE = function() {
  return 'put'
}
export const UpdateTunnelURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除隧道信息
 * request: DeleteTunnel
 * url: DeleteTunnelURL
 * method: DeleteTunnel_TYPE
 * raw_url: DeleteTunnel_RAW_URL
 * @param id - 隧道信息ID
 */
export const DeleteTunnel = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteTunnel_RAW_URL = function() {
  return '/monitor/tunnel/{id}'
}
export const DeleteTunnel_TYPE = function() {
  return 'delete'
}
export const DeleteTunnelURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建隧道信息
 * request: CreateTunnel
 * url: CreateTunnelURL
 * method: CreateTunnel_TYPE
 * raw_url: CreateTunnel_RAW_URL
 * @param body - 隧道信息参数
 */
export const CreateTunnel = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateTunnel_RAW_URL = function() {
  return '/monitor/tunnel'
}
export const CreateTunnel_TYPE = function() {
  return 'post'
}
export const CreateTunnelURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 导入多条隧道信息
 * request: InsertTunnels
 * url: InsertTunnelsURL
 * method: InsertTunnels_TYPE
 * raw_url: InsertTunnels_RAW_URL
 * @param body - 隧道信息参数
 */
export const InsertTunnels = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnel'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const InsertTunnels_RAW_URL = function() {
  return '/monitor/tunnel'
}
export const InsertTunnels_TYPE = function() {
  return 'patch'
}
export const InsertTunnelsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnel'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取隧道信息列表
 * request: GetTunnels
 * url: GetTunnelsURL
 * method: GetTunnels_TYPE
 * raw_url: GetTunnels_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTunnels = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnels'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetTunnels_RAW_URL = function() {
  return '/monitor/tunnels'
}
export const GetTunnels_TYPE = function() {
  return 'get'
}
export const GetTunnelsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnels'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑设备关系表信息
 * request: UpdateDeviceRelationTable
 * url: UpdateDeviceRelationTableURL
 * method: UpdateDeviceRelationTable_TYPE
 * raw_url: UpdateDeviceRelationTable_RAW_URL
 * @param id - 设备关系表信息ID
 * @param body - 设备关系表信息参数
 */
export const UpdateDeviceRelationTable = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceRelationTable/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateDeviceRelationTable_RAW_URL = function() {
  return '/monitor/deviceRelationTable/{id}'
}
export const UpdateDeviceRelationTable_TYPE = function() {
  return 'put'
}
export const UpdateDeviceRelationTableURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceRelationTable/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 设置设备位置信息
 * request: SetSplicePosition
 * url: SetSplicePositionURL
 * method: SetSplicePosition_TYPE
 * raw_url: SetSplicePosition_RAW_URL
 * @param id - 设备关系表信息ID
 * @param position - 位置信息
 */
export const SetSplicePosition = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceRelationTable/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['position'] !== undefined) {
    body = parameters['position']
  }
  if (parameters['position'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: position'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const SetSplicePosition_RAW_URL = function() {
  return '/monitor/deviceRelationTable/{id}'
}
export const SetSplicePosition_TYPE = function() {
  return 'patch'
}
export const SetSplicePositionURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceRelationTable/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除设备关系表信息
 * request: DeleteDeviceRelationTable
 * url: DeleteDeviceRelationTableURL
 * method: DeleteDeviceRelationTable_TYPE
 * raw_url: DeleteDeviceRelationTable_RAW_URL
 * @param id - 设备关系表信息ID
 */
export const DeleteDeviceRelationTable = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceRelationTable/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteDeviceRelationTable_RAW_URL = function() {
  return '/monitor/deviceRelationTable/{id}'
}
export const DeleteDeviceRelationTable_TYPE = function() {
  return 'delete'
}
export const DeleteDeviceRelationTableURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceRelationTable/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建设备关系表信息
 * request: CreateDeviceRelationTable
 * url: CreateDeviceRelationTableURL
 * method: CreateDeviceRelationTable_TYPE
 * raw_url: CreateDeviceRelationTable_RAW_URL
 * @param body - 设备关系表信息参数
 */
export const CreateDeviceRelationTable = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceRelationTable'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateDeviceRelationTable_RAW_URL = function() {
  return '/monitor/deviceRelationTable'
}
export const CreateDeviceRelationTable_TYPE = function() {
  return 'post'
}
export const CreateDeviceRelationTableURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceRelationTable'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 导入多条设备关系表信息
 * request: InsertDeviceRelationTables
 * url: InsertDeviceRelationTablesURL
 * method: InsertDeviceRelationTables_TYPE
 * raw_url: InsertDeviceRelationTables_RAW_URL
 * @param body - 设备关系表信息参数
 */
export const InsertDeviceRelationTables = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceRelationTable'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const InsertDeviceRelationTables_RAW_URL = function() {
  return '/monitor/deviceRelationTable'
}
export const InsertDeviceRelationTables_TYPE = function() {
  return 'patch'
}
export const InsertDeviceRelationTablesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceRelationTable'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备关系表信息列表
 * request: GetDeviceRelationTables
 * url: GetDeviceRelationTablesURL
 * method: GetDeviceRelationTables_TYPE
 * raw_url: GetDeviceRelationTables_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceRelationTables = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceRelationTables'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceRelationTables_RAW_URL = function() {
  return '/monitor/deviceRelationTables'
}
export const GetDeviceRelationTables_TYPE = function() {
  return 'get'
}
export const GetDeviceRelationTablesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceRelationTables'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取线路关系表信息列表(新)
 * request: GetRouteDeviceRelationTables
 * url: GetRouteDeviceRelationTablesURL
 * method: GetRouteDeviceRelationTables_TYPE
 * raw_url: GetRouteDeviceRelationTables_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetRouteDeviceRelationTables = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/routeDeviceRelationTables'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetRouteDeviceRelationTables_RAW_URL = function() {
  return '/monitor/routeDeviceRelationTables'
}
export const GetRouteDeviceRelationTables_TYPE = function() {
  return 'get'
}
export const GetRouteDeviceRelationTablesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/routeDeviceRelationTables'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取线路设备详细信息列表(新)
 * request: GetRouteDevices
 * url: GetRouteDevicesURL
 * method: GetRouteDevices_TYPE
 * raw_url: GetRouteDevices_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetRouteDevices = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/routeDeviceRelationTables'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const GetRouteDevices_RAW_URL = function() {
  return '/monitor/routeDeviceRelationTables'
}
export const GetRouteDevices_TYPE = function() {
  return 'patch'
}
export const GetRouteDevicesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/routeDeviceRelationTables'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取隧道设备关系表信息列表(新)
 * request: GetTunnelDeviceRelationTables
 * url: GetTunnelDeviceRelationTablesURL
 * method: GetTunnelDeviceRelationTables_TYPE
 * raw_url: GetTunnelDeviceRelationTables_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTunnelDeviceRelationTables = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnelDeviceRelationTables'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetTunnelDeviceRelationTables_RAW_URL = function() {
  return '/monitor/tunnelDeviceRelationTables'
}
export const GetTunnelDeviceRelationTables_TYPE = function() {
  return 'get'
}
export const GetTunnelDeviceRelationTablesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnelDeviceRelationTables'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取隧道设备详细信息列表(新)
 * request: GetTunnelDevices
 * url: GetTunnelDevicesURL
 * method: GetTunnelDevices_TYPE
 * raw_url: GetTunnelDevices_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetTunnelDevices = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/tunnelDeviceRelationTables'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const GetTunnelDevices_RAW_URL = function() {
  return '/monitor/tunnelDeviceRelationTables'
}
export const GetTunnelDevices_TYPE = function() {
  return 'patch'
}
export const GetTunnelDevicesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/tunnelDeviceRelationTables'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑设备联动信息
 * request: UpdateLinkedList
 * url: UpdateLinkedListURL
 * method: UpdateLinkedList_TYPE
 * raw_url: UpdateLinkedList_RAW_URL
 * @param id - 设备联动信息ID
 * @param body - 设备联动信息参数
 */
export const UpdateLinkedList = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/linkedLists/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateLinkedList_RAW_URL = function() {
  return '/monitor/linkedLists/{id}'
}
export const UpdateLinkedList_TYPE = function() {
  return 'put'
}
export const UpdateLinkedListURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/linkedLists/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除设备联动信息
 * request: DeleteLinkedList
 * url: DeleteLinkedListURL
 * method: DeleteLinkedList_TYPE
 * raw_url: DeleteLinkedList_RAW_URL
 * @param id - 设备联动信息ID
 */
export const DeleteLinkedList = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/linkedLists/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteLinkedList_RAW_URL = function() {
  return '/monitor/linkedLists/{id}'
}
export const DeleteLinkedList_TYPE = function() {
  return 'delete'
}
export const DeleteLinkedListURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/linkedLists/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建设备联动信息
 * request: CreateLinkedList
 * url: CreateLinkedListURL
 * method: CreateLinkedList_TYPE
 * raw_url: CreateLinkedList_RAW_URL
 * @param body - 设备联动信息参数
 */
export const CreateLinkedList = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/linkedList'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateLinkedList_RAW_URL = function() {
  return '/monitor/linkedList'
}
export const CreateLinkedList_TYPE = function() {
  return 'post'
}
export const CreateLinkedListURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/linkedList'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备联动信息列表
 * request: GetLinkedLists
 * url: GetLinkedListsURL
 * method: GetLinkedLists_TYPE
 * raw_url: GetLinkedLists_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetLinkedLists = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/linkedLists'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetLinkedLists_RAW_URL = function() {
  return '/monitor/linkedLists'
}
export const GetLinkedLists_TYPE = function() {
  return 'get'
}
export const GetLinkedListsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/linkedLists'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑撤防信息
 * request: UpdateRemoval
 * url: UpdateRemovalURL
 * method: UpdateRemoval_TYPE
 * raw_url: UpdateRemoval_RAW_URL
 * @param id - 撤防信息ID
 * @param body - 撤防信息参数
 */
export const UpdateRemoval = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/removal/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateRemoval_RAW_URL = function() {
  return '/monitor/removal/{id}'
}
export const UpdateRemoval_TYPE = function() {
  return 'put'
}
export const UpdateRemovalURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/removal/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除撤防信息
 * request: DeleteRemoval
 * url: DeleteRemovalURL
 * method: DeleteRemoval_TYPE
 * raw_url: DeleteRemoval_RAW_URL
 * @param id - 撤防信息ID
 */
export const DeleteRemoval = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/removal/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteRemoval_RAW_URL = function() {
  return '/monitor/removal/{id}'
}
export const DeleteRemoval_TYPE = function() {
  return 'delete'
}
export const DeleteRemovalURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/removal/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建撤防信息
 * request: CreateRemoval
 * url: CreateRemovalURL
 * method: CreateRemoval_TYPE
 * raw_url: CreateRemoval_RAW_URL
 * @param body - 撤防信息参数
 */
export const CreateRemoval = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/removal'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateRemoval_RAW_URL = function() {
  return '/monitor/removal'
}
export const CreateRemoval_TYPE = function() {
  return 'post'
}
export const CreateRemovalURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/removal'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取撤防信息列表
 * request: GetRemovals
 * url: GetRemovalsURL
 * method: GetRemovals_TYPE
 * raw_url: GetRemovals_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetRemovals = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/removals'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetRemovals_RAW_URL = function() {
  return '/monitor/removals'
}
export const GetRemovals_TYPE = function() {
  return 'get'
}
export const GetRemovalsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/removals'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史撤防信息列表
 * request: GetHistoryRemovals
 * url: GetHistoryRemovalsURL
 * method: GetHistoryRemovals_TYPE
 * raw_url: GetHistoryRemovals_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetHistoryRemovals = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/removals'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const GetHistoryRemovals_RAW_URL = function() {
  return '/monitor/removals'
}
export const GetHistoryRemovals_TYPE = function() {
  return 'patch'
}
export const GetHistoryRemovalsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/removals'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑设备事件信息
 * request: UpdateDeviceEvent
 * url: UpdateDeviceEventURL
 * method: UpdateDeviceEvent_TYPE
 * raw_url: UpdateDeviceEvent_RAW_URL
 * @param id - 设备事件ID
 * @param body - 设备事件信息参数
 */
export const UpdateDeviceEvent = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceEvent/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateDeviceEvent_RAW_URL = function() {
  return '/monitor/deviceEvent/{id}'
}
export const UpdateDeviceEvent_TYPE = function() {
  return 'put'
}
export const UpdateDeviceEventURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceEvent/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除设备事件信息
 * request: DeleteDeviceEvent
 * url: DeleteDeviceEventURL
 * method: DeleteDeviceEvent_TYPE
 * raw_url: DeleteDeviceEvent_RAW_URL
 * @param id - 设备事件信息ID
 */
export const DeleteDeviceEvent = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceEvent/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteDeviceEvent_RAW_URL = function() {
  return '/monitor/deviceEvent/{id}'
}
export const DeleteDeviceEvent_TYPE = function() {
  return 'delete'
}
export const DeleteDeviceEventURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceEvent/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建设备事件信息
 * request: CreateDeviceEvent
 * url: CreateDeviceEventURL
 * method: CreateDeviceEvent_TYPE
 * raw_url: CreateDeviceEvent_RAW_URL
 * @param body - 设备事件信息参数
 */
export const CreateDeviceEvent = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceEvent'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateDeviceEvent_RAW_URL = function() {
  return '/monitor/deviceEvent'
}
export const CreateDeviceEvent_TYPE = function() {
  return 'post'
}
export const CreateDeviceEventURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceEvent'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取设备事件信息列表
 * request: GetDeviceEvents
 * url: GetDeviceEventsURL
 * method: GetDeviceEvents_TYPE
 * raw_url: GetDeviceEvents_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetDeviceEvents = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/deviceEvents'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetDeviceEvents_RAW_URL = function() {
  return '/monitor/deviceEvents'
}
export const GetDeviceEvents_TYPE = function() {
  return 'get'
}
export const GetDeviceEventsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/deviceEvents'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑电缆隧道出入记录
 * request: UpdateAccessRecord
 * url: UpdateAccessRecordURL
 * method: UpdateAccessRecord_TYPE
 * raw_url: UpdateAccessRecord_RAW_URL
 * @param id - 电缆隧道出入记录ID
 * @param body - 电缆隧道出入记录参数
 */
export const UpdateAccessRecord = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/accessRecord/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateAccessRecord_RAW_URL = function() {
  return '/monitor/accessRecord/{id}'
}
export const UpdateAccessRecord_TYPE = function() {
  return 'put'
}
export const UpdateAccessRecordURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/accessRecord/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除电缆隧道出入记录
 * request: DeleteAccessRecord
 * url: DeleteAccessRecordURL
 * method: DeleteAccessRecord_TYPE
 * raw_url: DeleteAccessRecord_RAW_URL
 * @param id - 设备事件信息ID
 */
export const DeleteAccessRecord = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/accessRecord/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteAccessRecord_RAW_URL = function() {
  return '/monitor/accessRecord/{id}'
}
export const DeleteAccessRecord_TYPE = function() {
  return 'delete'
}
export const DeleteAccessRecordURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/accessRecord/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建电缆隧道出入记录
 * request: CreateAccessRecord
 * url: CreateAccessRecordURL
 * method: CreateAccessRecord_TYPE
 * raw_url: CreateAccessRecord_RAW_URL
 * @param body - 电缆隧道出入记录参数
 */
export const CreateAccessRecord = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/accessRecord'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateAccessRecord_RAW_URL = function() {
  return '/monitor/accessRecord'
}
export const CreateAccessRecord_TYPE = function() {
  return 'post'
}
export const CreateAccessRecordURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/accessRecord'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取电缆隧道出入记录列表
 * request: GetAccessRecords
 * url: GetAccessRecordsURL
 * method: GetAccessRecords_TYPE
 * raw_url: GetAccessRecords_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetAccessRecords = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/monitor/accessRecords'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetAccessRecords_RAW_URL = function() {
  return '/monitor/accessRecords'
}
export const GetAccessRecords_TYPE = function() {
  return 'get'
}
export const GetAccessRecordsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/monitor/accessRecords'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取企业通讯录列表
 * request: GetCompanyAddressBooks
 * url: GetCompanyAddressBooksURL
 * method: GetCompanyAddressBooks_TYPE
 * raw_url: GetCompanyAddressBooks_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCompanyAddressBooks = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyAddressBooks'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCompanyAddressBooks_RAW_URL = function() {
  return '/message/companyAddressBooks'
}
export const GetCompanyAddressBooks_TYPE = function() {
  return 'get'
}
export const GetCompanyAddressBooksURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyAddressBooks'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取一条企业通讯录信息
 * request: GetCompanyAddressBook
 * url: GetCompanyAddressBookURL
 * method: GetCompanyAddressBook_TYPE
 * raw_url: GetCompanyAddressBook_RAW_URL
 * @param id - 企业通讯录ID
 */
export const GetCompanyAddressBook = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyAddressBook/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCompanyAddressBook_RAW_URL = function() {
  return '/message/companyAddressBook/{id}'
}
export const GetCompanyAddressBook_TYPE = function() {
  return 'get'
}
export const GetCompanyAddressBookURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyAddressBook/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑通讯录信息
 * request: UpdateCompanyAddressBook
 * url: UpdateCompanyAddressBookURL
 * method: UpdateCompanyAddressBook_TYPE
 * raw_url: UpdateCompanyAddressBook_RAW_URL
 * @param id - 企业通讯录ID
 * @param body - 通讯录参数
 */
export const UpdateCompanyAddressBook = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyAddressBook/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateCompanyAddressBook_RAW_URL = function() {
  return '/message/companyAddressBook/{id}'
}
export const UpdateCompanyAddressBook_TYPE = function() {
  return 'put'
}
export const UpdateCompanyAddressBookURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyAddressBook/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除企业通讯录
 * request: DeleteCompanyAddressBook
 * url: DeleteCompanyAddressBookURL
 * method: DeleteCompanyAddressBook_TYPE
 * raw_url: DeleteCompanyAddressBook_RAW_URL
 * @param id - 企业通讯录ID
 */
export const DeleteCompanyAddressBook = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyAddressBook/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteCompanyAddressBook_RAW_URL = function() {
  return '/message/companyAddressBook/{id}'
}
export const DeleteCompanyAddressBook_TYPE = function() {
  return 'delete'
}
export const DeleteCompanyAddressBookURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyAddressBook/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建企业通讯录
 * request: CreateCompanyAddressBook
 * url: CreateCompanyAddressBookURL
 * method: CreateCompanyAddressBook_TYPE
 * raw_url: CreateCompanyAddressBook_RAW_URL
 * @param body - 企业通讯录参数
 */
export const CreateCompanyAddressBook = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyAddressBook'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateCompanyAddressBook_RAW_URL = function() {
  return '/message/companyAddressBook'
}
export const CreateCompanyAddressBook_TYPE = function() {
  return 'post'
}
export const CreateCompanyAddressBookURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyAddressBook'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 导入多条企业通讯录
 * request: InsertCompanyAddressBooks
 * url: InsertCompanyAddressBooksURL
 * method: InsertCompanyAddressBooks_TYPE
 * raw_url: InsertCompanyAddressBooks_RAW_URL
 * @param body - 企业通讯录参数
 */
export const InsertCompanyAddressBooks = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyAddressBook'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const InsertCompanyAddressBooks_RAW_URL = function() {
  return '/message/companyAddressBook'
}
export const InsertCompanyAddressBooks_TYPE = function() {
  return 'patch'
}
export const InsertCompanyAddressBooksURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyAddressBook'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 校验导入数据是否重复
 * request: MessageCheckInsertDuplicateData
 * url: MessageCheckInsertDuplicateDataURL
 * method: MessageCheckInsertDuplicateData_TYPE
 * raw_url: MessageCheckInsertDuplicateData_RAW_URL
 * @param body - 企业通讯录参数
 */
export const MessageCheckInsertDuplicateData = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyAddressBook/check'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const MessageCheckInsertDuplicateData_RAW_URL = function() {
  return '/message/companyAddressBook/check'
}
export const MessageCheckInsertDuplicateData_TYPE = function() {
  return 'post'
}
export const MessageCheckInsertDuplicateDataURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyAddressBook/check'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 校验数据是否重复
 * request: MessageCheckDuplicateData
 * url: MessageCheckDuplicateDataURL
 * method: MessageCheckDuplicateData_TYPE
 * raw_url: MessageCheckDuplicateData_RAW_URL
 * @param data - 数据
 * @param dataType - 数据类型
 * @param table - 表名
 */
export const MessageCheckDuplicateData = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/check'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['data'] !== undefined) {
    queryParameters['data'] = parameters['data']
  }
  if (parameters['dataType'] !== undefined) {
    queryParameters['data_type'] = parameters['dataType']
  }
  if (parameters['table'] !== undefined) {
    queryParameters['table'] = parameters['table']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const MessageCheckDuplicateData_RAW_URL = function() {
  return '/message/check'
}
export const MessageCheckDuplicateData_TYPE = function() {
  return 'get'
}
export const MessageCheckDuplicateDataURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/check'
  if (parameters['data'] !== undefined) {
    queryParameters['data'] = parameters['data']
  }
  if (parameters['dataType'] !== undefined) {
    queryParameters['data_type'] = parameters['dataType']
  }
  if (parameters['table'] !== undefined) {
    queryParameters['table'] = parameters['table']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑企业通讯录分组
 * request: UpdateCompanyGroup
 * url: UpdateCompanyGroupURL
 * method: UpdateCompanyGroup_TYPE
 * raw_url: UpdateCompanyGroup_RAW_URL
 * @param id - 通讯录分组信息ID
 * @param body - 通讯录分组信息参数
 */
export const UpdateCompanyGroup = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyGroup/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateCompanyGroup_RAW_URL = function() {
  return '/message/companyGroup/{id}'
}
export const UpdateCompanyGroup_TYPE = function() {
  return 'put'
}
export const UpdateCompanyGroupURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyGroup/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除企业通讯录分组信息
 * request: DeleteCompanyGroup
 * url: DeleteCompanyGroupURL
 * method: DeleteCompanyGroup_TYPE
 * raw_url: DeleteCompanyGroup_RAW_URL
 * @param id - 通讯录分组信息ID
 */
export const DeleteCompanyGroup = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyGroup/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteCompanyGroup_RAW_URL = function() {
  return '/message/companyGroup/{id}'
}
export const DeleteCompanyGroup_TYPE = function() {
  return 'delete'
}
export const DeleteCompanyGroupURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyGroup/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建企业通讯录分组
 * request: CreateCompanyGroup
 * url: CreateCompanyGroupURL
 * method: CreateCompanyGroup_TYPE
 * raw_url: CreateCompanyGroup_RAW_URL
 * @param parentid - 父节点Id
 * @param body - 通讯录分组参数
 */
export const CreateCompanyGroup = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyGroup'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['parentid'] !== undefined) {
    queryParameters['parentid'] = parameters['parentid']
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateCompanyGroup_RAW_URL = function() {
  return '/message/companyGroup'
}
export const CreateCompanyGroup_TYPE = function() {
  return 'post'
}
export const CreateCompanyGroupURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyGroup'
  if (parameters['parentid'] !== undefined) {
    queryParameters['parentid'] = parameters['parentid']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取企业通讯录分组列表
 * request: GetCompanyGroups
 * url: GetCompanyGroupsURL
 * method: GetCompanyGroups_TYPE
 * raw_url: GetCompanyGroups_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetCompanyGroups = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyGroups'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetCompanyGroups_RAW_URL = function() {
  return '/message/companyGroups'
}
export const GetCompanyGroups_TYPE = function() {
  return 'get'
}
export const GetCompanyGroupsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyGroups'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 通过父节点ID获取子节点企业通讯录信息列表
 * request: GetCompanyGroupsByID
 * url: GetCompanyGroupsByIDURL
 * method: GetCompanyGroupsByID_TYPE
 * raw_url: GetCompanyGroupsByID_RAW_URL
 * @param id - 父节点ID
 */
export const GetCompanyGroupsByID = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/companyGroups'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, formData, config)
}
export const GetCompanyGroupsByID_RAW_URL = function() {
  return '/message/companyGroups'
}
export const GetCompanyGroupsByID_TYPE = function() {
  return 'patch'
}
export const GetCompanyGroupsByIDURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/companyGroups'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建发件箱信息
 * request: CreateOutBoxMessage
 * url: CreateOutBoxMessageURL
 * method: CreateOutBoxMessage_TYPE
 * raw_url: CreateOutBoxMessage_RAW_URL
 * @param body - 发件箱信息参数
 */
export const CreateOutBoxMessage = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/outBoxMessage'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateOutBoxMessage_RAW_URL = function() {
  return '/message/outBoxMessage'
}
export const CreateOutBoxMessage_TYPE = function() {
  return 'post'
}
export const CreateOutBoxMessageURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/outBoxMessage'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取发件箱信息列表
 * request: GetOutBoxMessages
 * url: GetOutBoxMessagesURL
 * method: GetOutBoxMessages_TYPE
 * raw_url: GetOutBoxMessages_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetOutBoxMessages = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/outBoxMessages'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetOutBoxMessages_RAW_URL = function() {
  return '/message/outBoxMessages'
}
export const GetOutBoxMessages_TYPE = function() {
  return 'get'
}
export const GetOutBoxMessagesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/outBoxMessages'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取收件箱信息列表
 * request: GetInBoxMessages
 * url: GetInBoxMessagesURL
 * method: GetInBoxMessages_TYPE
 * raw_url: GetInBoxMessages_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetInBoxMessages = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/inBoxMessages'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetInBoxMessages_RAW_URL = function() {
  return '/message/inBoxMessages'
}
export const GetInBoxMessages_TYPE = function() {
  return 'get'
}
export const GetInBoxMessagesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/inBoxMessages'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建定时发送
 * request: CreateDelayedSend
 * url: CreateDelayedSendURL
 * method: CreateDelayedSend_TYPE
 * raw_url: CreateDelayedSend_RAW_URL
 * @param body - 定时发送参数
 */
export const CreateDelayedSend = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/delayedSend'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateDelayedSend_RAW_URL = function() {
  return '/message/delayedSend'
}
export const CreateDelayedSend_TYPE = function() {
  return 'post'
}
export const CreateDelayedSendURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/delayedSend'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 编辑运营商号段
 * request: UpdateSectionNumber
 * url: UpdateSectionNumberURL
 * method: UpdateSectionNumber_TYPE
 * raw_url: UpdateSectionNumber_RAW_URL
 * @param id - 运营商号段ID
 * @param body - 运营商号段参数
 */
export const UpdateSectionNumber = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/sectionNumber/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, formData, config)
}
export const UpdateSectionNumber_RAW_URL = function() {
  return '/message/sectionNumber/{id}'
}
export const UpdateSectionNumber_TYPE = function() {
  return 'put'
}
export const UpdateSectionNumberURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/sectionNumber/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除运营商号段
 * request: DeleteSectionNumber
 * url: DeleteSectionNumberURL
 * method: DeleteSectionNumber_TYPE
 * raw_url: DeleteSectionNumber_RAW_URL
 * @param id - 运营商号段ID
 */
export const DeleteSectionNumber = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/sectionNumber/{id}'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, formData, config)
}
export const DeleteSectionNumber_RAW_URL = function() {
  return '/message/sectionNumber/{id}'
}
export const DeleteSectionNumber_TYPE = function() {
  return 'delete'
}
export const DeleteSectionNumberURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/sectionNumber/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 创建运营商号段
 * request: CreateSectionNumber
 * url: CreateSectionNumberURL
 * method: CreateSectionNumber_TYPE
 * raw_url: CreateSectionNumber_RAW_URL
 * @param body - 运营商号段参数
 */
export const CreateSectionNumber = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/sectionNumber'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, formData, config)
}
export const CreateSectionNumber_RAW_URL = function() {
  return '/message/sectionNumber'
}
export const CreateSectionNumber_TYPE = function() {
  return 'post'
}
export const CreateSectionNumberURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/sectionNumber'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取运营商号段列表
 * request: GetSectionNumbers
 * url: GetSectionNumbersURL
 * method: GetSectionNumbers_TYPE
 * raw_url: GetSectionNumbers_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetSectionNumbers = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/sectionNumbers'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetSectionNumbers_RAW_URL = function() {
  return '/message/sectionNumbers'
}
export const GetSectionNumbers_TYPE = function() {
  return 'get'
}
export const GetSectionNumbersURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/sectionNumbers'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取通讯录分组关系树列表
 * request: GetFullMesTrees
 * url: GetFullMesTreesURL
 * method: GetFullMesTrees_TYPE
 * raw_url: GetFullMesTrees_RAW_URL
 * @param limit - 每页列表的项目数
 * @param skip - 跳过列表的项目数
 * @param q - 搜索列表条件
 */
export const GetFullMesTrees = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let config = parameters.$config ? parameters.$config : {}
  let path = '/message/fullMesTrees'
  let body
  let queryParameters = {}
  let form = {}
  let formData = new FormData()
  if (config['headers'] === undefined) {
    config['headers'] = {}
  }
  config.headers['Content-Type'] = 'application/json'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, formData, config)
}
export const GetFullMesTrees_RAW_URL = function() {
  return '/message/fullMesTrees'
}
export const GetFullMesTrees_TYPE = function() {
  return 'get'
}
export const GetFullMesTreesURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/message/fullMesTrees'
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}