const tabTree = 'tabTree'
const level = 'level'
const routeData = 'routeData'
const alertData = 'alertData'
const treeKey = 'treeKey'
const spliceData = 'spliceData'
const Tunname = 'Tunname'
const Monitname = 'Monitname'
const currentKey = 'currentKey'
const deviceGroup = 'deviceGroup'
const groupDetail = 'groupDetail'

export function getTabTree() {
  return window.sessionStorage.getItem(tabTree)
}
export function setTabTree(name) {
  return window.sessionStorage.setItem(tabTree, name)
}
export function deleteTabTree() {
  return window.sessionStorage.removeItem(tabTree)
}

export function getLevel() {
  return window.sessionStorage.getItem(level)
}
export function setLevel(num) {
  return window.sessionStorage.setItem(level, num)
}
export function deleteLevel() {
  return window.sessionStorage.removeItem(level)
}

export function getRoutedata() {
  return window.sessionStorage.getItem(routeData)
}
export function setRoutedata(data) {
  return window.sessionStorage.setItem(routeData, JSON.stringify(data))
}
export function deleteRoutedata() {
  return window.sessionStorage.removeItem(routeData)
}

export function getAlertdata() {
  return window.sessionStorage.getItem(alertData)
}
export function setAlertdata(data) {
  return window.sessionStorage.setItem(alertData, JSON.stringify(data))
}

export function gettreeKey() {
  return window.sessionStorage.getItem(treeKey)
}
export function settreeKey(num) {
  return window.sessionStorage.setItem(treeKey, JSON.stringify(num))
}
export function deletetreeKey() {
  return window.sessionStorage.removeItem(treeKey)
}

export function getDeviceGroup() {
  return window.sessionStorage.getItem(deviceGroup)
}
export function setDeviceGroup(name) {
  return window.sessionStorage.setItem(deviceGroup, name)
}
export function deleteDeviceGroup() {
  return window.sessionStorage.removeItem(deviceGroup)
}

export function getdevicedata() {
  return window.sessionStorage.getItem(spliceData)
}
export function setdevicedata(data) {
  return window.sessionStorage.setItem(spliceData, JSON.stringify(data))
}

export function getTunname() {
  return window.sessionStorage.getItem(Tunname)
}
export function setTunname(num) {
  return window.sessionStorage.setItem(Tunname, num)
}
export function deleteTunname() {
  return window.sessionStorage.removeItem(Tunname)
}
export function getMonitname() {
  return window.sessionStorage.getItem(Monitname)
}
export function setMonitname(num) {
  return window.sessionStorage.setItem(Monitname, num)
}
export function deleteMonitname() {
  return window.sessionStorage.removeItem(Monitname)
}

export function getCurrentKey() {
  return window.sessionStorage.getItem(currentKey)
}
export function setCurrentKey(key) {
  return window.sessionStorage.setItem(currentKey, key)
}
export function deleteCurrentKey() {
  return window.sessionStorage.removeItem(currentKey)
}

export const processStationLocation = {
  currentPage: 'processStationLocationCurrentPage',
  processStationName: 'processStationLocationProcessStationName'
}
export const processStationCard = {
  locationId: 'processStationCardlocationId',
  cardId: 'processStationCardcardId'
}
export const processStationDevice = {
  locationId: 'processStationDevicelocationId',
  cardId: 'processStationDevicecardId',
  deviceId: 'processStationDevicedeviceId',
  currentPage: 'processStationDeviceCurrentPage'
}
export const processStationDeviceInfo = {
  devicename: 'processStationDeviceInfodevicename',
  id: 'processStationDeviceInfoid',
  cablename: 'processStationDeviceInfocablename',
  attrType: 'processStationDeviceInfoattrType',
  cables: 'processStationDeviceInfocables',
  spcname: 'processStationDeviceInfospcname',
  cardId: 'processStationDeviceInfocardId',
  cableName: 'processStationDeviceInfocableName',
  cable_id: 'processStationDeviceInfocable_id',
  pageType: 'processStationDeviceInfopageType',
  doubleDevice: 'processStationDeviceInfodoubleDevice',
  code: 'processStationDeviceInfocode',
  runObj: 'processStationDeviceInforunObj',
  logicalDeviceStatus: 'processStationDeviceInfoLogicalDeviceStatus',
  detailName: 'processStationDeviceInfoDetailName',
  routeType: 'processStationDeviceInfoRouteType'
}

export const processStationDeviceId = 'processStationDeviceId'
export function setItem(key, value) {
  return window.sessionStorage.setItem(key, value)
}
export function getItem(key) {
  return window.sessionStorage.getItem(key)
}

export function getGroupdata() {
  return window.sessionStorage.getItem(groupDetail)
}
export function setGroupdata(data) {
  return window.sessionStorage.setItem(groupDetail, JSON.stringify(data))
}
