import fetch from "../utils/fetch"

export function getCategoryTree(id) {
  return fetch({
    url: '/web/api/item/getCategoryTree',
    method: 'get',
    params: {id}
  })
}

export function getItemsByCategoryId(page, size, categoryId) {
  return fetch({
    url: '/web/api/item/getItemsByCategoryId',
    method: 'get',
    params: {page, size, categoryId}
  })
}

export function getItemDepartment(parentId) {
  return fetch({
    url: '/manage/admin/department/listByDepartment',
    method: 'get',
    params: {parentId}
  })
}

export function getItemPageByDepartmentId(page, size, departmentId) {
  return fetch({
    url: '/web/api/item/getItemPageByDepartmentId',
    method: 'get',
    params: {page, size, departmentId}
  })
}


