import fetch from "../../utils/fetch"

export function getNumber(itemId, phone) {
  const data = {itemId, phone}
  return fetch({
    url: '/api/zwfw-web/itemNumber/getNumber',
    method: 'get',
    params: data
  })
}
