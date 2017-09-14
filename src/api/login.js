import { fetchSys, fetchZwfw } from '../utils/fetch'

export function validateVerifyCode(verifyCode) {
  const data = {verifyCode}
  return fetchSys({
    url: '/web/common/validateVerifyCode',
    method: 'post',
    data
  })
}

export function doLogin(loginInfo) {
  const data = loginInfo
  return fetchZwfw({
    url: '/web/doLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return fetchZwfw({
    url: '/web/findMemberById',
    method: 'get'
  })
}

export function doLogout() {
  return fetchZwfw({
    url: '/web/doLogout',
    method: 'post'
  })
}

export function isUserExist(loginName) {
  const data = {loginName}
  return fetchZwfw({
    url: '/web/register/isExist',
    method: 'post',
    data
  })
}

export function getPhoneVerifyCode(phone) {
  const data = {phone}
  return fetchSys({
    url: '/web/common/getPhoneVerifyCode',
    method: 'post',
    data
  })
}

export function validatePhoneVerifyCode(verifyCode) {
  const data = {verifyCode}
  return fetchSys({
    url: '/web/common/validatePhoneVerifyCode',
    method: 'post',
    data
  })
}

export function doRegister(userInfo) {
  const data = userInfo
  return fetchZwfw({
    url: '/web/doRegister',
    method: 'post',
    data
  })
}
