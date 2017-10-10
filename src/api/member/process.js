import { fetchZwfw } from "../../utils/fetch"

export function getMyProcessPage(page, rows, itemName, statusList) {
  return fetchZwfw({
    url: '/web/process/list',
    method: 'get',
    params: {page, rows, itemName, statusList}
  })
}
