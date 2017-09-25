import { fetchZwfw } from "../../utils/fetch"

export function getMyItem(memberId) {
  return fetchZwfw({
    url: '/web/member/findMyItem',
    method: 'get',
    params: {memberId}
  })
}

export function getMyProcessPage(offset, limit, q, status) {
  return fetchZwfw({
    url: '/web/member/process/list',
    method: 'get',
    params: {offset, limit, q, status}
  })
}

export function getMyMessagePage(offset, limit, readStatus) {
  return fetchZwfw({
    url: '/web/memberMessage/listByMemberId',
    method: 'get',
    params: {offset, limit, readStatus}
  })
}
