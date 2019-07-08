import router from './router'
import store from './store'
import { getToken } from "./utils/auth"
import {Message} from 'element-ui'

const whiteList = [
  '/login', '/register', '/retrieve', '/guide/index', '/fta', '/once'
]

const whitePath = '/guide/detail'

router.beforeEach((to, from, next) => {
  if (store.getters.enums.length === 0) {
    store.dispatch('SetEnums');
  }
  if (store.getters.dicts.length === 0) {
    store.dispatch('SetDicts');
  }
  if (whiteList.includes(to.path) || to.path.startsWith(whitePath)) {
    console.log("白名单")
    next()
  } else {
    console.log("token:" + getToken())
    if (getToken()) {
      console.log("memberId:" + store.getters.id)
      if (store.getters.id) {
        next()
      } else {
        store.dispatch("GetInfo").then(() => {
          next()
        })
      }
    } else {
      Message({
        message: "登录超时，请重新登录",
        type: 'error',
        duration: 5 * 1000
      })
      // console.log("permission.js")
      window.sessionStorage.removeItem("id")
      window.sessionStorage.removeItem("name")
      next('/login')
    }
  }
})
