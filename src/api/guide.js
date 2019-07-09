import fetch from "../utils/fetch"

export function getItemCategory(parentId) {
  return fetch({
    url: '/manage/admin/department/listByDepartment',
    method: 'get',
    params: {parentId}
  })
}

export function getItemPageByCategories(page, size, departmentId) {
  return fetch({
    url: '/web/api/item/getItemPageByCategories',
    method: 'get',
    params: {page, size, departmentId}
  })
}


