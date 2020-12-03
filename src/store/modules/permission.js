import {
  asyncRoutes,
  constantRoutes
} from '@/router'
// import {
//   deepClone
// } from '@/utils/index'
import {
  GetMenus
} from '@/api/iot-apis'
var path = require('path')
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(role, route) {
  var roles = []
  roles.push(role)
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function generateTree(routes, basePath = '/', checkedKeys) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    const routePath = path.resolve(basePath, tmp.path)
    if (tmp.children) {
      tmp.children = generateTree(tmp.children, routePath, checkedKeys)
    }
    if (
      checkedKeys.includes(routePath) ||
      (tmp.children && tmp.children.length >= 1) ||
      tmp.path === '*'
    ) {
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(async resolve => {
      const req = {
        rolename: roles
      }
      // 获取权限列表
      const routeUrl = await GetMenus(req)
      var urlList = []
      for (const u of routeUrl) {
        urlList.push(u.url)
      }
      let accessedRoutes
      if (roles === 'root') {
        accessedRoutes = asyncRoutes || []
      } else {
        // 生成权限树
        accessedRoutes = generateTree(asyncRoutes, '/', urlList)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
