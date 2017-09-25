import { fetchZwfw } from "../../utils/fetch"

export function submitPretrial(pretrialInfo) {
  const data = pretrialInfo
  return fetchZwfw({
    url: '/web/itemPretrial/insert',
    method: 'post',
    data
  })
}

export function getPretrialInfo(id) {
  return fetchZwfw({
    url: '/web/itemPretrial/findById',
    method: 'get',
    params: {id}
  })
}

export function getPretrialPage(offset, limit, q, status) {
  return fetchZwfw({
    url: '/web/member/pretrial/list',
    method: 'get',
    params: {offset, limit, q, status}
  })
}
