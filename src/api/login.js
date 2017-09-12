import fetch from '../utils/fetch'

export function validateVerifyCode(verifyCode) {
  const data = verifyCode
  return fetch({
    url: '/web/common/validateVerifyCode',
    method: 'post',
    data
  })
}

export function doLogin(loginInfo) {
  const data = loginInfo
  return fetch({
    url: '/web/doLogin',
    method: 'post',
    data
  })
}

export function isUserExist(username) {
  const data = username
  return fetch({
    url: '/web/register/isExist',
    method: 'post',
    data
  })
}

export function getPhoneVerifyCode(phone) {
  const data = phone
  return fetch({
    url: '/web/common/getPhoneVerifyCode',
    method: 'post',
    data
  })
}

export function validatePhoneVerifyCode(verifyCode) {
  const data = verifyCode
  return fetch({
    url: '/web/common/validatePhoneVerifyCode',
    method: 'post',
    data
  })
}

export function doRegister(userInfo) {
  const data = userInfo
  return fetch({
    url: '/web/doRegister',
    method: 'post',
    data
  })
}
