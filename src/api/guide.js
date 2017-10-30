import fetch from "../utils/fetch"

export function getItemCategory(parentId) {
  return fetch({
    url: '/api/zwfw/web/category/getItemCategory',
    method: 'get',
    params: {parentId}
  })
}

export function getItemPageByCategories(page, rows, itemCategories) {
  return fetch({
    url: '/api/zwfw/web/item/list',
    method: 'get',
    params: {page, rows, itemCategories}
  })
}


