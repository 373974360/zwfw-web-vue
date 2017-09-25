import { fetchZwfw } from "../../utils/fetch"

export function getAllFavorites() {
  return fetchZwfw({
    url: '/web/member/favorites/getAll',
    method: 'get'
  })
}

export function getFavoritePage(offset, limit) {
  return fetchZwfw({
    url: '/web/member/favorites/list',
    method: 'get',
    params: {offset, limit}
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
