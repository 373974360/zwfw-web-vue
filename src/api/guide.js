import fetch from "../utils/fetch"

export function getCategoryTree(id) {
  return fetch({
    url: '/web/api/item/getCategoryTree',
    method: 'get',
    params: {id}
  })
}

export function getItemPageByCategoryId(page, size, categoryId, serviceObject) {
  return fetch({
    url: '/web/api/item/getItemPageByCategoryId',
    method: 'get',
    params: {page, size, categoryId, serviceObject}
  })
}

export function getItemDepartment(parentId) {
  return fetch({
    url: '/manage/admin/department/listByDepartment',
    method: 'get',
    params: {parentId}
  })
}

export function getItemPageByDepartmentId(page, size, departmentId, serviceObject) {
  return fetch({
    url: '/web/api/item/getItemPageByDepartmentId',
    method: 'get',
    params: {page, size, departmentId, serviceObject}
  })
}


