import fetch from "../utils/fetch"

export function getItemDetail(id) {
  return fetch({
    url: '/web/api/item/getItemDetail',
    method: 'get',
    params: {id}
  })
}

export function getItemConditions(itemId) {
  return fetch({
    url: '/api/zwfw-web/itemCondition/listByItemId',
    method: 'get',
    params: {itemId}
  })
}

export function getItemMaterials(itemId) {
  return fetch({
    url: '/web/api/item/selectNewestMaterialsByItemId',
    method: 'get',
    params: {itemId}
  })
}

export function getItemPreorderConfig(itemId) {
  return fetch({
    url: '/api/zwfw-web/itempreorder/config',
    method: 'get',
    params: {itemId}
  })
}

export function getItemDelivery(itemId) {
  return fetch({
    url: '/web/api/item/getItemDelivery',
    method: 'get',
    params: {itemId}
  })
}
