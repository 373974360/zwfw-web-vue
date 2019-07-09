import app from '../store/modules/app'
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

export function enums(value, type) {
  let array = app.state.enums[type]
  if(!array) {
    return ''
  }
  let result = array.filter(item => { return item.code === value });
  if (result[0]) {
    return result[0].value || value
  } else {
    return ''
  }
}

export function dicts(value, type) {
  let array = app.state.dicts[type]
  let result = array.filter(item => { return item.code === value });
  if (result[0]) {
    return result[0].value || value
  } else {
    result = array.filter(item => { return item.code === `${type}_${value}` });
    if (result[0]) {
      return result[0].value || value
    } else {
      return ''
    }
  }
}

export function deliveryStatusFilter(status) {
  const deliveryStatusMap = {
    0: '快递收件（揽件）',
    1: '在途中',
    2: '派件中',
    3: '已签收',
    4: '派送失败（拒签等）'
  };
  return deliveryStatusMap[status];
}

export function expressTypeFilter(type) {
  const expressTypeMap = {
    'EMS': '邮政EMS',
    'HTKY': '百世快递',
    'DEPPON': '德邦物流',
    'GTO': '国通快递',
    'KYEXPRESS': '跨越速运',
    'STO': '申通快递',
    'SFEXPRESS': '顺丰速运',
    'TTKDEX': '天天快递',
    'YTO': '圆通速递',
    'YUNDA': '韵达快递',
    'ZJS': '宅急送',
    'ZTO': '中通快递'
  };
  return expressTypeMap[type];
}
