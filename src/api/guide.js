import { fetchZwfw } from "../utils/fetch"

export function getItemCategory(parentId) {
  return fetchZwfw({
    url: '/web/category/getItemCategory',
    method: 'get',
    params: {parentId}
  })
}

export function getItemPageByCategories(page, rows, itemCategories) {
  return fetchZwfw({
    url: '/web/item/list',
    method: 'get',
    params: {page, rows, itemCategories}
  })
}


