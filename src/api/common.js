import fetch from "../utils/fetch"

export function getEnums() {
  return fetch({
    url: '/manage/common/getEnums',
    method: 'get'
  });
}

export function getDicts() {
  return fetch({
    url: '/manage/common/getDictionaries',
    method: 'get'
  });
}
