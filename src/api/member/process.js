import fetch from '../../utils/fetch'

export function getMyProcessPage(query) {
  return fetch({
    url: '/web/api/handling/getProcessPage',
    method: 'get',
    params: query
  })
}

export function sendPostCode(processNumber) {
  const data = {processNumber};
  return fetch({
    url: '/api/zwfw-web/process/sendPostCode',
    method: 'post',
    data
  })
}
