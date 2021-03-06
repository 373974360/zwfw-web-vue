import Cookies from 'js-cookie'

// const TokenKey = 'Zwfw-Token'
const TokenKey = 'member_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
