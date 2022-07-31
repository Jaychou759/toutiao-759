import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//一级路由组件渲染在App
//当转换路径时候再去请求页面,懒加载页面
//优化首屏加载速度
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    //如果子路由的path 没有/ 那么会把父亲path和儿子path拼接
    //如果子路由的path 有/ 不会拼接
    // 二级路由当中如果没有/ 那么就是会和一级路由进行拼接 假设一级路由 /my 二级路由 home 那么就是/my/home
    // 二级路由当中如果有/ 那么就是不会和一级路由进行拼接
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/answer',
        component: () => import('@/views/Answer')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
