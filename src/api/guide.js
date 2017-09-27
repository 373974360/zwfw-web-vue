import { fetchZwfw } from "../utils/fetch"

export function getItemCategory() {
  return fetchZwfw({
    url: '/web/category/getItemCategory',
    method: 'get'
  })
}

export function getItemPageByCategories(page, rows, itemCategories) {
  return fetchZwfw({
    url: '/web/item/list',
    method: 'get',
    params: {page, rows, itemCategories}
  })
}


