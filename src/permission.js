import router from './router'
import store from './store'
import { getToken } from "./utils/auth"

const whiteList = [
  '/login', '/register', '/retrieve', '/guide/index', '/guide/detail', '/fta', '/once'
]

router.beforeEach((to, from, next) => {
  if (getToken()) {//判断是否有token
    if (to.path === '/login' || to.path === '/register') {
      next({path: '/guide'})
    } else {
      if (store.getters.id.length === 0) {
        store.dispatch('GetInfo').then(() => {
          next({...to})
        }).catch(() => {

        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
