import fetch from '../../utils/fetch'

export function submitPretrial(pretrialInfo) {
  const data = pretrialInfo
  return fetch({
    url: '/web/api/sso/preaudit/saveOrUpdatePreauditRecordVo',
    method: 'post',
    data
  })
}

export function getPretrialInfo(id) {
  return fetch({
    url: '/web/api/sso/preaudit/getPretrialInfo',
    method: 'get',
    params: {id}
  })
}

export function getPretrialPage(page, size, itemName, status, memberId) {
  return fetch({
    url: '/web/api/sso/preaudit/getPretrialPage',
    method: 'get',
    params: {page, size, itemName, status, memberId}
  })
}

export function getMailboxes() {
  return fetch({
    url: '/api/zwfw-web/mailbox/getAll',
    method: 'get'
  })
}
