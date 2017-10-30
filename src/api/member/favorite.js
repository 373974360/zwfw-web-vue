import fetch from '../../utils/fetch'

export function getAllFavorites() {
  return fetch({
    url: '/api/zwfw/web/member/favorite/getAll',
    method: 'get'
  })
}

export function getFavoritePage(page, rows) {
  return fetch({
    url: '/api/zwfw/web/member/favorite/list',
    method: 'get',
    params: {page, rows}
  })
}

export function addFavorite(itemId) {
  const data = {itemId}
  return fetch({
    url: '/api/zwfw/web/member/favorite/add',
    method: 'post',
    data
  })
}

export function delFavorite(id) {
  const data = {id}
  return fetch({
    url: '/api/zwfw/web/member/favorite/delete',
    method: 'post',
    data
  })
}
