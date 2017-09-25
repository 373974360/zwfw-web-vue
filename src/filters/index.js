import moment from 'moment'

export function splitLines(str) {
  if (!str) {
    return "";
  }
  return str.toString().replace(/\r\n/g,"<br />").replace(/\r/g,"<br />").replace(/\n/g,"<br />");
}

export function date(value, format) {
  if (value) {
    return moment(value).format(format)
  }
  return ''
}

export function pretrialStatus(status) {
  const statusMap = {
    '1': '待提交申请',
    '2': '等待预审',
    '3': '整改',
    '4': '通过审核',
    '5': '不予受理'
  }
  return statusMap[status]
}

export function processStatus(status) {
  const statusMap = {
    '5': '待办',
    '10': '在办',
    '15': '办结',
    '99': '不予受理'
  }
  return statusMap[status]
}
