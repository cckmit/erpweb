import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expires) {
  const time = new Date().getTime() + (Number(expires) * 1000)
  return Cookies.set(TokenKey, token, { expires: new Date(time) })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
