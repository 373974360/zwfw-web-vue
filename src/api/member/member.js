import fetch from '../../utils/fetch'

export function getMyProfile() {
  return fetch({
    url: '/api/zwfw/web/member/getMyProfile',
    method: 'get'
  })
}

export function getDetailInfo() {
  return fetch({
    url: '/api/zwfw/web/member/getDetailInfo',
    method: 'get'
  })
}

export function getMyItem() {
  return fetch({
    url: '/api/zwfw/web/member/getMyItem',
    method: 'get'
  })
}

export function updatePersonInfo(personInfo) {
  const data = personInfo
  return fetch({
    url: '/api/zwfw/web/member/updatePersonInfo',
    method: 'post',
    data
  })
}

export function updateCompanyInfo(companyInfo) {
  const data = companyInfo
  return fetch({
    url: '/api/zwfw/web/member/updateCompanyInfo',
    method: 'post',
    data
  })
}

export function updatePassword(pwInfo) {
  const data = pwInfo
  return fetch({
    url: '/api/zwfw/web/member/updatePassword',
    method: 'post',
    data
  })
}
