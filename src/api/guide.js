import { fetchZwfw } from "../utils/fetch"

export function getDeptCategoryByPid(parentId) {
  return fetchZwfw({
    url: '/web/data/getItemCategoryByPid',
    method: 'get',
    params: {parentId}
  })
}

export function getItemListByDept(offset, limit, itemCategories) {
  return fetchZwfw({
    url: '/web/item/list',
    method: 'get',
    params: {offset, limit, itemCategories}
  })
}

export function getSimpleItemList(offset, limit, itemCategories) {
  return fetchZwfw({
    url: '/web/item/list/simple',
    method: 'get',
    params: {offset, limit, itemCategories}
  })
}

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

export function getAllFavorites() {
  return fetchZwfw({
    url: '/web/member/favorites/getAll',
    method: 'get'
  })
}

export function addFavorite(itemId) {
  const data = {itemId}
  return fetchZwfw({
    url: '/web/memberFavorite/insert',
    method: 'post',
    data
  })
}

export function delFavorite(itemId) {
  const data = {itemId}
  return fetchZwfw({
    url: '/web/memberFavorite/delete',
    method: 'post',
    data
  })
}

export function submitPretrial(pretrialInfo) {
  const data = pretrialInfo
  console.log(data)
  return fetchZwfw({
    url: '/web/itemPretrial/insert',
    method: 'post',
    data
  })
}

export function getItemPretrial(id) {
  return fetchZwfw({
    url: '/web/itemPretrial/findById',
    method: 'get',
    params: {id}
  })
}

export function getPretrialList() {
  return fetchZwfw({
    url: '/web/member/pretrial/list',
    method: 'get'
  })
}

export function findMyItem(memberId) {
  return fetchZwfw({
    url: '/web/member/findMyItem',
    method: 'get',
    params: {memberId}
  })
}
