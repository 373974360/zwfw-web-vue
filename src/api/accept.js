import fetch from '../utils/fetch'

export function getAllMailbox(query) {
  return fetch({
    url: '/web/api/sso/accept/findMailboxList',
    method: 'get',
    params: query
  })
}

export function getDefaultReceiveAddress() {
  return fetch({
    url: '/web/api/sso/accept/getDefaultReceiveAddress',
    method: 'get'
  })
}

export function findMemberAddressList(memberId) {
  return fetch({
    url: '/web/api/sso/accept/findMemberAddressList',
    method: 'get',
    params: {memberId}
  })
}

export function saveHandType(data) {
  return fetch({
    url: '/web/api/sso/handType/saveHandType',
    method: 'post',
    data
  })
}

export function getResvCode(workNo) {
  return fetch({
    url: '/web/api/sso/handType/getResvCode',
    method: 'get',
    params: {workNo}
  })
}

export function saveTakeType(data) {
  return fetch({
    url: '/web/api/sso/takeType/saveTakeType',
    method: 'post',
    data
  })
}
