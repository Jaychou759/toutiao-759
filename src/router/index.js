import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//一级路由组件渲染在App
//当转换路径时候再去请求页面,懒加载页面
//优化首屏加载速度
const routes = [{ path: '/login', component: () => import('@/views/Login') }]

const router = new VueRouter({
  routes
})

export default router
