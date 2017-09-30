import { fetchZwfw } from "../../utils/fetch"

export function getAllFavorites() {
  return fetchZwfw({
    url: '/web/member/favorite/getAll',
    method: 'get'
  })
}

export function getFavoritePage(page, rows) {
  return fetchZwfw({
    url: '/web/member/favorite/list',
    method: 'get',
    params: {page, rows}
  })
}

export function addFavorite(itemId) {
  const data = {itemId}
  return fetchZwfw({
    url: '/web/member/favorite/add',
    method: 'post',
    data
  })
}

export function delFavorite(id) {
  const data = {id}
  return fetchZwfw({
    url: '/web/member/favorite/delete',
    method: 'post',
    data
  })
}
