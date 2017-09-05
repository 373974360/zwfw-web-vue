import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_production')

Vue.use(Router)

export const constantRouterMap = [
  {path: '/login', component:_import('login/index'), hidden: true},
  {path: '/register', component:_import('login/register'), hidden: true},
  {path: '/retrieve', component:_import('login/retrieve'), hidden: true}
]

export default new Router({
  routes: constantRouterMap
})
