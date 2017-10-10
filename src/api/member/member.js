import { fetchZwfw } from "../../utils/fetch"

export function getMyItem() {
  return fetchZwfw({
    url: '/web/member/getMyItem',
    method: 'get'
  })
}

export function getMyMessagePage(page, rows) {
  return fetchZwfw({
    url: '/web/member/message/list',
    method: 'get',
    params: {page, rows}
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

export function updatePassword(password) {
  const data = {password}
  return fetchZwfw({
    url: '/web/member/updatePassword',
    method: 'post',
    data
  })
}
