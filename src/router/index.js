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
      {path: 'fta', component: _import('fta/index'), name: '自贸区一站式服务'},
      {path: 'once', component: _import('once/index'), name: '最多跑一次'}
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    name: '办事指南',
    children: [
      {path: 'index', component: _import('guide/index')},
      {path: 'detail', component: _import('guide/detail'), name: '详细'}
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})
