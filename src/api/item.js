import { fetchZwfw } from "../utils/fetch"

export function getItemDetail(id) {
  return fetchZwfw({
    url: '/web/item/findById',
    method: 'get',
    params: {id}
  })
}

export function getItemConditions(itemId) {
  return fetchZwfw({
    url: '/web/itemCondition/listByItemId',
    method: 'get',
    params: {itemId}
  })
}

export function getItemMaterials(itemId) {
  return fetchZwfw({
    url: '/web/itemMaterial/listByItemId',
    method: 'get',
    params: {itemId}
  })
}

export function getItemPreorderConfig(itemId) {
  return fetchZwfw({
    url: '/web/itempreorder/config',
    method: 'get',
    params: {itemId}
  })
}
