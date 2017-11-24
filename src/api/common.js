import { fetchSys } from "../utils/fetch"

export function getEnums() {
  return fetchSys({
    url: '/base/enums',
    method: 'get'
  });
}

export function getDicts() {
  return fetchSys({
    url: '/base/dicts',
    method: 'get'
  });
}

export function getHoliday(year) {
  return fetch({
    url: '/api/common/holiday',
    method: 'get',
    params: {year}
  })
}
