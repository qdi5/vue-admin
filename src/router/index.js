import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getPageTitle } from 'utils'
import getToken from 'utils/auth'
import Layout from '@/layout'
NProgress.configure({ showSpinner: false })

Vue.use(VueRouter)

// 白名单（不需要重定向的路由地址）
/* eslint-disable */
const whiteList = ['/login', '/']

// 所有权限通用路由表
export const commRouterMap = [
   // 首页
   {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "dashboardIndex" */ 'views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ 'views/login.vue')
  },
  // 案例
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "table" */ 'views/table/index'),
        meta: {
          title: 'Table',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import(/* webpackChunkName: "tree" */'views/tree/index'),
        meta: {
          title: 'Tree',
          icon: 'tree'
        }
      }
    ]
  },
  // 表单
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import(/* webpackChunkName: "form" */ 'views/form/index'),
        meta: {
          title: 'Form',
          icon: 'form'
        }
      }
    ]
  },
  // 404页面
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notfound" */ 'views/notfound.vue')
  }
]

// 根据权限动态加载的路由表
export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/notfound',
    hidden: true
  }
]

const router = new VueRouter({
  routes: commRouterMap
})

// 全局路由钩子
router.beforeEach(async (to, from, next) => {




  NProgress.start()
  // 设置页面title
  document.title = getPageTitle(to.meta.title)
  // 1、判断token
  const token = getToken()
  debugger
  // 已登录
  if (token) {

    // 如果跳转的页面是登录页，则拦截后，跳转到首页
    if (to.name === 'login') {

      next({ name: 'index' })
      npDone()
    } else {
      // 判断当前用户是否已拉取完用户信息
      const hasRoles = store.getters.getRoles?.length > 0
      if (hasRoles) {

        next()
      } else {
          try {

            // 2、获取用户信息
            const { data: { roles } } = await store.dispatch('user/getUserInfo')

             // 生成可访问的路由表
            const accessedRoutes = await store.dispatch('permission/generateRoutes', roles)
            router.addRoutes(accessedRoutes)

            next({...to, replace: true})
          } catch (error) {

            next(`/login?redirect=${to.path}`)
            npDone()
          }
      }
    }
    // 未登录
  } else {

    // 这里的写法等同于：whiteList.indexOf(to.path) !== -1
    if (~whiteList.indexOf(to.path)) {

      next()
    } else {

      next(`/login?redirect=${to.path}`)
      npDone()
    }
  }
  // 3、跳转
})

router.afterEach(() => {
  npDone ()
})

// 使进度条完成
function npDone () {
  NProgress.done()
}
export default router
