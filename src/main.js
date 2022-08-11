import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import '@/style/index.css'
import './utils/dayjs'


Vue.use(Vant)
Vue.config.productionTip = false

// 兄弟组件传递参数
const EventBus = new Vue()
Vue.prototype.$EventBus = EventBus

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
