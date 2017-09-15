import { fetchZwfw } from "../utils/fetch"

export function findMyItem(memberId) {
  const data = {memberId}
  return fetchZwfw({
    url: '/web/member/findMyItem',
    method: 'post',
    data
  })
}

export function getMyProcess() {
  return fetchZwfw({
    url: '/web/member/process/list',
    method: 'post'
  })
}
