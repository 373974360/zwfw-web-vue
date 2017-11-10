import fetch from '../../utils/fetch'

export function submitPretrial(pretrialInfo) {
  const data = pretrialInfo
  return fetch({
    url: '/api/zwfw-web/pretrial/submit',
    method: 'post',
    data
  })
}

export function getPretrialInfo(id) {
  return fetch({
    url: '/api/zwfw-web/pretrial/getById',
    method: 'get',
    params: {id}
  })
}

export function getPretrialPage(page, rows, itemName, statusList) {
  return fetch({
    url: '/api/zwfw-web/pretrial/list',
    method: 'get',
    params: {page, rows, itemName, statusList}
  })
}
