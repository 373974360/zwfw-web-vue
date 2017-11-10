import fetch from '../utils/fetch'

export function validateVerifyCode(verifyCode) {
  const data = {verifyCode}
  return fetch({
    url: '/api/zwfw-web/common/validateVerifyCode',
    method: 'post',
    data
  })
}

export function getPhoneVerifyCode(phone) {
  const data = {phone}
  return fetch({
    url: '/api/zwfw-web/common/getPhoneVerifyCode',
    method: 'post',
    data
  })
}

export function validatePhoneVerifyCode(verifyCode) {
  const data = {verifyCode}
  return fetch({
    url: '/api/zwfw-web/common/validatePhoneVerifyCode',
    method: 'post',
    data
  })
}

export function doLogin(loginInfo) {
  const data = loginInfo
  /*return fetch({
    url: '/api/zwfw-web/doLogin',
    method: 'post',
    data
  })*/
  return fetch({
    url: '/api/auth/webJwt/token',
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

export function getPwVerifyCode(loginName) {
  const data = {loginName}
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
