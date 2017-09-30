import { fetchZwfw } from "../../utils/fetch"

export function submitPretrial(pretrialInfo) {
  const data = pretrialInfo
  return fetchZwfw({
    url: '/web/pretrial/submit',
    method: 'post',
    data
  })
}

export function getPretrialInfo(id) {
  return fetchZwfw({
    url: '/web/pretrial/getById',
    method: 'get',
    params: {id}
  })
}

export function getPretrialPage(page, rows, itemName, statusList) {
  return fetchZwfw({
    url: '/web/pretrial/list',
    method: 'get',
    params: {page, rows, itemName, statusList}
  })
}
