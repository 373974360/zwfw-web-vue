import fetch from '../utils/fetch'

export function queryClosestMailbox(lat, lng) {
  return fetch({
    url: '/web/api/mailbox/queryClosest',
    method: 'get',
    params: {lat, lng}
  })
}
