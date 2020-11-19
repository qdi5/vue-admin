import * as mutationTypes from '../mutation-types'
import { commRouterMap, asyncRouterMap } from '@/router'
import { cloneDeep } from 'lodash-es'

const ADMINISTRATOR = 'admin'
/**
 * 判断当前用户是否有访问指定路由的权限
 * @param {array 用户拥有的角色} roles
 * @param {object 路由对象} route
 */
function hasPermission (roles, route) {
  if (route.meta?.roles) {
    // 只要用户拥有当前路由设置的角色，则返回true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 如果此路由没有设置roles元信息，则默认所有用户都能访问此路由
    return true
  }
}

// 根据权限，递归过滤异步路由表，得到当前用户能访问的路由表
/**
 * @param {array 异步添加的路由表} routes
 * @param {roles 用户拥有的角色} roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = cloneDeep(route)
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  [mutationTypes.SET_ROUTES] (state, routes) {
    state.addRoutes = routes
    // commRouterMap.concat(routes)
    state.routes = [...commRouterMap, ...asyncRouterMap]
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return Promise.resolve((function () {
      let accessedRoutes
      if (roles.includes(ADMINISTRATOR)) {
        accessedRoutes = asyncRouterMap || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      }
      commit(mutationTypes.SET_ROUTES, accessedRoutes)
      return accessedRoutes
    })())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
