import fetch from '../../utils/fetch'

export function getMyProcessPage(page, rows, itemName, inStatus) {
  return fetch({
    url: '/api/zwfw-web/process/list',
    method: 'get',
    params: {page, rows, itemName, inStatus}
  })
}

export function sendPostCode(pretrialNumber) {
  const data = {pretrialNumber};
  return fetch({
    url: '/api/zwfw-web/process/sendPostCode',
    method: 'post',
    data
  })
}
