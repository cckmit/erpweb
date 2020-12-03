import {
  CreateWsConnectionURL
} from '@/api/iot-apis'
import {
  getToken
} from '@/utils/auth'

const state = {
  ws: {},
  message: {},
  alertNum: 0,
  currentDeviceData: [],
  auth: false,
  introduction: '',
  roles: [],
  currentRole: '',
	userInfo: {},
	deviceInfo: {}
}

const mutations = {
  SET_WS: (state, ws) => {
    state.ws = ws
  },
  SET_MESSAGE: (state, message) => {
    state.message = message
  },
  SET_ALERTNUM: (state, num) => {
    state.alertNum = num
  },
  SET_CURRENTDEVICEDATA: (state, val) => {
    state.currentDeviceData = val
  },
  SET_AUTH: (state, val) => {
    state.auth = val
  },
  SET_DEVICEINFO: (state, val) => {
    state.deviceInfo = val
  },
  // SET_CURRENTROLE: (state, role) => {
  //   state.currentRole = role
  // },
  // SET_USERINFO: (state, data) => {
  //   state.userInfo = data
  // }
}

const socketType = {
  alert_type: 'alert_type',
  current_data: 'current_data'
}

function analyseData(commit, e) {
  const res = JSON.parse(e)
  const data = JSON.parse(res.response)
  switch (res.type) {
    case socketType['alert_type']:
      commit('SET_ALERTNUM', data.total_count)
      break
    case socketType['current_data']:
      commit('SET_CURRENTDEVICEDATA', data)
      break
  }
}
const actions = {
  // user login
  create({
    commit
  }) {
    var str = CreateWsConnectionURL()
    if (str.indexOf('http') === -1) { // 生产模式
      str = window.location.origin + str
    }

    if (str.indexOf('https') > -1) {
      str = str.replace('https', 'wss')
    } else {
      str = str.replace('http', 'ws')
    }
    const ws = new WebSocket(str)
    commit('SET_WS', ws)
    state.ws.onopen = function() {
      // console.log('socket 连接已建立...')
      var token = getToken() || ''
      actions.send('', JSON.stringify({
        type: 'authorization',
        request: token.replace('Bearer ', '')
      }))
    }
    state.ws.onmessage = function(event) {
      // console.log('socket receive :', event)
      if (event.data === 'Authentication success') {
        commit('SET_AUTH', true)
        return
      }
      analyseData(commit, event.data)
      commit('SET_MESSAGE', event)
    }
    state.ws.onclose = function() {
      var a = getToken()
      if (a !== '') {
        actions.create({
          commit
        })
      }
      // console.log('onclose socket 连接已关闭...')
    }
  },
  // get user info
  send({
    commit
  },
  data) {
    if (state.ws.readyState === 1) {
      // console.log('socket send:', data)
      state.ws.send(data)
    } else {
      // console.log('send failed data:', data)
    }
  },
  getSocketReadyState({
    commit
  },) {
    return new Promise((resolve, reject) => {
      try {
        resolve(state.ws.readyState)
      } catch (err) {
        resolve(0)
      }
    })
  },
  close({
    commit
  },) {
    try {
      if (state.ws) {
        state.ws.close()
      }
    } catch (err) {
      console.log(err)
    }
	},
	updateDeviceInfo({
    commit
	}, data) {
		try {
     commit('SET_DEVICEINFO', data)
    } catch (err) {
      console.log(err)
    }
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
