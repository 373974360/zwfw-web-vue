import router from './router'
import store from './store'
import { getToken } from "./utils/auth"

const whiteList = [
  '/login', '/register', '/retrieve', '/guide/index', '/fta', '/once'
]

const whitePath0 = '/guide/detail'
const whitePath1 = '/guide/preorder'

router.beforeEach((to, from, next) => {
  if (store.getters.enums.length === 0) {
    store.dispatch('SetEnums');
  }
  if (store.getters.dicts.length === 0) {
    store.dispatch('SetDicts');
  }
  if (getToken()) {//判断是否有token
    if (to.path === '/login' || to.path === '/register') {
      next({path: '/guide'})
    } else {
      if (store.getters.id.length === 0) {
        store.dispatch('GetInfo').then(() => {
          next(to.path)
        }).catch(() => {

        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path) || to.path.startsWith(whitePath0) || to.path.startsWith(whitePath1)) {
      next()
    } else {
      next('/login')
    }
  }
})
