import { fetchZwfw } from "../utils/fetch"

export function getItemCategoryByPid(parentId) {
  return fetchZwfw({
    url: '/web/data/getItemCategoryByPid',
    method: 'get',
    params: {parentId}
  })
}

export function getSimpleItemList(offset, limit, itemCategories) {
  const data = {offset, limit, itemCategories}
  return fetchZwfw({
    url: '/web/item/list/simple',
    method: 'get',
    data
  })
}

export function getItemDetail(id) {
  const data = {id}
  return fetchZwfw({
    url: '/web/item/findById',
    method: 'get',
    data
  })
}

export function getItemConditions(itemId) {
  const data = {itemId}
  return fetchZwfw({
    url: '/web/itemCondition/listByItemId',
    method: 'get',
    data
  })
}

export function getItemMaterials(itemId) {
  const data = {itemId}
  return fetchZwfw({
    url: '/web/itemMaterial/listByItemId',
    method: 'get',
    data
  })
}

export function getAllFavorites() {
  return fetchZwfw({
    url: '/web/member/favorites/getAll',
    method: 'get',
    data
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
