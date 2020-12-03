import {
  Login,
  GetUserInfo,
  RefreshToken,
  Logout
} from '@/api/iot-apis'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'
import crypto from 'crypto'
const state = {
  token: getToken(),
  name: '',
  id: '',
  avatar: '',
  introduction: '',
  roles: [],
  currentRole: '',
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_CURRENTROLE: (state, role) => {
    state.currentRole = role
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      Login({
        username: username.trim(),
        password: password
      }).then(data => {
        commit('SET_TOKEN', data.token_type + ' ' + data.access_token)
        setToken(data.token_type + ' ' + data.access_token, data.expires_in)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise(async(resolve, reject) => {
      const data = await GetUserInfo()
      commit('SET_USERINFO', data)
      if (!data) {
        reject('Verification failed, please Login again.')
      }

      const {
        id,
        role,
        name
        // avatar,
        // introduction
      } = data
      localStorage.setItem('currentrole', role)
      commit('SET_CURRENTROLE', role)
      commit('SET_ROLES', role)
      commit('SET_NAME', name)
      commit('SET_ID', id)
      var md5 = crypto.createHash('md5')
      md5.update('')
      const avatar = 'https://s.gravatar.com/avatar/' + md5.digest('hex')
      commit('SET_AVATAR', avatar)
      // commit('SET_INTRODUCTION', introduction)
      resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      Logout().then(res => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        sessionStorage.removeItem('roles')
        // sessionStorage.removeItem('currentrole')
        removeToken()
        resetRouter()
        resolve()
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async(resolve, reject) => {
      var refresh_token = getToken().split(' ')[1]
      var obj = {
        refreshToken: refresh_token,
        grantType: 'refresh_token',
        scope: role
      }
      RefreshToken(obj).then(async(data) => {
        commit('SET_TOKEN', data.token_type + ' ' + data.access_token)
        setToken(data.token_type + ' ' + data.access_token)
        localStorage.setItem('currentrole', role)
        // if (role === 'user') {
        //   var locationRoute = []
        //   var locationlist = await GetLocations({
        //     'limit': 0,
        //     'skip': 0
        //   })
        //   for (var i = 0; i < locationlist.items.length; i++) {
        //     var children = {
        //       path: locationlist.items[i].id,
        //       component: () => import('@/views/dataview/newindex'),
        //       name: locationlist.items[i].id,
        //       meta: {
        //         title: locationlist.items[i].name
        //       }
        //     }
        //     locationRoute.push(children)
        //   }
        //   resetRouter()
        //   const accessRoutes = await dispatch('permission/generateRoutes', [role], {
        //     root: true
        //   })
        //   for (var j = 0; j < accessRoutes.length; j++) {
        //     if (accessRoutes[j].name === 'Dataview') {
        //       accessRoutes[j].children = []
        //       accessRoutes[j].children = locationRoute
        //     }
        //   }
        //   router.addRoutes(accessRoutes)
        // } else {
        //   resetRouter()
        //   const accessRoutes = await dispatch('permission/generateRoutes', [role], {
        //     root: true
        //   })
        //   router.addRoutes(accessRoutes)
        // }
        resetRouter()
        const accessRoutes = await dispatch('permission/generateRoutes', [role], {
          root: true
        })
        router.addRoutes(accessRoutes)
        resolve()
      }).catch(error => {
        if (error.response.status === 401) {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          sessionStorage.removeItem('roles')
          localStorage.removeItem('currentrole')
          removeToken()
          resetRouter()
        }
        reject(error)
      })
      commit('SET_CURRENTROLE', role)

      resetRouter()

      // generate accessible routes map based on roles
      // const accessRoutes = await dispatch('permission/generateRoutes', [role], {
      //   root: true
      // })
      // dynamically add accessible routes
      // router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
