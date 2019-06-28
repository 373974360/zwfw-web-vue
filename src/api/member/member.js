import fetch from '../../utils/fetch'

export function getMemberProfile() {
  return fetch({
    url: '/web/api/sso/getMemberProfile',
    method: 'get'
  })
}




export function getMyProfile() {
  return fetch({
    url: '/api/zwfw-web/member/getDetailInfo',
    method: 'get'
  })
}

export function getDetailInfo() {
  return fetch({
    url: '/api/zwfw-web/member/getDetailInfo',
    method: 'get'
  })
}

export function getMyItem() {
  return fetch({
    url: '/api/zwfw-web/member/getMyItem',
    method: 'get'
  })
}

export function updatePersonInfo(personInfo) {
  const data = personInfo
  return fetch({
    url: '/api/zwfw-web/member/updatePersonInfo',
    method: 'post',
    data
  })
}

export function updateCompanyInfo(companyInfo) {
  const data = companyInfo
  return fetch({
    url: '/api/zwfw-web/member/updateCompanyInfo',
    method: 'post',
    data
  })
}

export function updatePassword(pwInfo) {
  const data = pwInfo
  return fetch({
    url: '/api/zwfw-web/member/updatePassword',
    method: 'post',
    data
  })
}

export function getPhoneVerifyCodeLogged(random) {
  const data = {random}
  return fetch({
    url: '/api/zwfw-web/member/getPhoneVerifyCodeLogged',
    method: 'post',
    data
  })
}

export function validateMemberInfo(validateInfo) {
  const data = validateInfo;
  return fetch({
    url: '/api/zwfw-web/member/validateMemberInfo',
    method: 'post',
    data
  });
}
