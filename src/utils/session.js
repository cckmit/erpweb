// 区域ID
const RegionId = 'RegionId'

export function getRegionId() {
  return sessionStorage.getItem(RegionId)
}
export function setRegionId(id) {
  return sessionStorage.setItem(RegionId, id)
}
