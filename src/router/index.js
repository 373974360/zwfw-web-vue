import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../views/layout/Layout'

const _import = require('./_import_production')

Vue.use(Router)

export const constantRouterMap = [
  {
    path:'/login', component: _import('login/index'), hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    name: '首页',
    children: [
      {path: 'register', component: _import('login/register'), name: '注册', hidden: true},
      {path: 'retrieve', component: _import('login/retrieve'), name: '找回密码', hidden: true},
      {path: 'guide', component: _import('guide/index'), name: '办事指南'},
      {path: 'fta', component: _import('fta/index'), name: '自贸区一站式服务'},
      {path: 'once', component: _import('once/index'), name: '最多跑一次'}
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})
