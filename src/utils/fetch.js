import axios from 'axios'
import { Message } from 'element-ui'
import Qs from 'qs'
import store from '../store'
import router from '../router';

let baseURL = ''

export function fetchSys(object) {
  baseURL = process.env.SYS_API
  return fetch(object)
}

export function fetchZwfw(object) {
  baseURL = process.env.ZWFW_API
  return fetch(object)
}

function fetch(object) {
  //创建axios实例
  const service = axios.create({
    baseURL: baseURL,
    timeout: 1000 * 60 * 5,
    withCredentials: true,
    transformRequest: [function(data) {
      if (!data)
        data = {}
      data = Qs.stringify(data, {arrayFormat: 'indices', allowDots: true})
      return data
    }]
  })

  service.interceptors.request.use(
    config => {
      /*config.data = JSON.stringify(config.data)
      config.headers = {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }*/
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    response => {
      let code = response.status
      /**
       * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
       * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
       */
      if (code !== 200) {
        if (code === 207) {
          Message({
            message: "短时间内请求太过频繁，请重新刷新页面",
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          Message({
            message: response.data.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        code = response.data.httpCode;
        if (code === 401) {
          Message({
            message: "登录超时，请重新登录",
            type: 'error',
            duration: 5 * 1000
          })
          // 登出
          store.dispatch('DoLogout').then(() => {
            router.push({ path: '/login' })
          })
        }
        if (code === 403) {
          Message({
            message: "当前登录用户没有此权限",
            type: 'error',
            duration: 5 * 1000
          })
        }
      }
      return response.data
    },
    error => {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  return service(object)
}
