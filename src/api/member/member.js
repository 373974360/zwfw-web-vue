import { fetchZwfw } from "../../utils/fetch"

export function getMyProfile() {
  return fetchZwfw({
    url: '/web/member/getMyProfile',
    method: 'get'
  })
}

export function getDetailInfo() {
  return fetchZwfw({
    url: '/web/member/getDetailInfo',
    method: 'get'
  })
}

export function getMyItem() {
  return fetchZwfw({
    url: '/web/member/getMyItem',
    method: 'get'
  })
}

export function updatePersonInfo(personInfo) {
  const data = personInfo
  return fetchZwfw({
    url: '/web/member/updatePersonInfo',
    method: 'post',
    data
  })
}

export function updateCompanyInfo(companyInfo) {
  const data = companyInfo
  return fetchZwfw({
    url: '/web/member/updateCompanyInfo',
    method: 'post',
    data
  })
}

export function updatePassword(pwInfo) {
  const data = pwInfo
  return fetchZwfw({
    url: '/web/member/updatePassword',
    method: 'post',
    data
  })
}
