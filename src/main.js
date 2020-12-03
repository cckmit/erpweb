import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters

/* 导入 dialog 拖拽指令*/
import drag from './directive/el-drag-dialog'
Vue.use(drag)
import {
  setDomain,
  setAxiosInstance
} from '@/api/iot-apis'
import request from '@/utils/request'
setDomain(process.env.VUE_APP_BASE_API)
setAxiosInstance(request)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
