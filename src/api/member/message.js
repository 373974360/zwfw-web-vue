import fetch from '../../utils/fetch'

export function getMyMessagePage(page, rows) {
  return fetch({
    url: '/api/zwfw/web/member/message/list',
    method: 'get',
    params: {page, rows}
  })
}
