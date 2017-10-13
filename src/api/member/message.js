import { fetchZwfw } from "../../utils/fetch"

export function getMyMessagePage(page, rows) {
  return fetchZwfw({
    url: '/web/member/message/list',
    method: 'get',
    params: {page, rows}
  })
}
