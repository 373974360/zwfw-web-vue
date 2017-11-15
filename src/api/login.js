import fetch from '../utils/fetch'

export function validateVerifyCode(verifyCode, random) {
  const data = {verifyCode, random}
  return fetch({
    url: '/api/common/validateVerifyCode',
    method: 'post',
    data
  })
}

export function getPhoneVerifyCode(phone, random) {
  const data = {phone, random}
  return fetch({
    url: '/api/common/getPhoneVerifyCode',
    method: 'post',
    data
  })
}

export function doLogin(loginInfo) {
  const data = loginInfo
  return fetch({
    url: '/api/auth/memberJwt/token',
    method: 'post',
    data
  })
}

export function doLogout() {
  return fetch({
    url: '/api/zwfw-web/doLogout',
    method: 'post'
  })
}

export function isUserExist(loginName) {
  const data = {loginName}
  return fetch({
    url: '/api/zwfw-web/isExist',
    method: 'post',
    data
  })
}

export function doRegister(userInfo) {
  const data = userInfo
  return fetch({
    url: '/api/zwfw-web/doRegister',
    method: 'post',
    data
  })
}

export function getPwVerifyCode(loginName, random) {
  const data = {loginName, random}
  return fetch({
    url: '/api/zwfw-web/getPwVerifyCode',
    method: 'post',
    data
  })
}

export function retrievePw(pwInfo) {
  const data = pwInfo
  return fetch({
    url: '/api/zwfw-web/retrievePw',
    method: 'post',
    data
  })
}
