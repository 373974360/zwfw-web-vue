import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../views/layout/Layout'
import Layout2 from '../views/layout/Layout2'

const _import = require('./_import_production')

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/guide/detail/print/:itemId', component: _import('guide/print'), hidden: true},
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
      {path: 'detail/:itemId', component: _import('guide/detail'), name: '详细'},
      {path: 'pretrial/:key/:value', component: _import('guide/pretrial')}
    ]
  },
  {
    path: '/member',
    component: Layout2,
    redirect: '/member/index',
    name: '个人中心',
    children: [
      {path: 'index', component: _import('member/index')},
      {path: 'process', component: _import('member/myProcess'), name: '我的办件'},
      {path: 'pretrial', component: _import('member/myPretrial'), name: '我的预审'},
      {path: 'collection', component: _import('member/myCollection'), name: '我的收藏'},
      {path: 'message', component: _import('member/message'), name: '我的消息'},
      {path: 'personInfo', component: _import('member/personInfo'), name: '个人信息'},
      {path: 'companyInfo', component: _import('member/companyInfo'), name: '企业信息'},
      {path: 'changePw', component: _import('member/changePw'), name: '修改密码'}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  routes: constantRouterMap
})
