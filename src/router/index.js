import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../views/layout/Layout'

const _import = require('./_import_production')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    name: '首页',
    children: [
      {path: 'login', component: _import('login/index'), hidden: true},
      {path: 'register', component: _import('login/register'), name: '注册', hidden: true},
      {path: 'retrieve', component:_import('login/retrieve'), name: '找回密码', hidden: true},
      {path: 'guide', component:_import('guide/index'), name: '办事指南', hidden: true}
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})
