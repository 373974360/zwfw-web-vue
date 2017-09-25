import { fetchZwfw } from "../utils/fetch"

export function getDeptCategoryByPid(parentId) {
  return fetchZwfw({
    url: '/web/data/getItemCategoryByPid',
    method: 'get',
    params: {parentId}
  })
}

export function getItemPageByDept(offset, limit, itemCategories) {
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


