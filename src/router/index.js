import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/comsumer/',
      name: 'Layout',
      component: () => import('@/views/layout/Layout.vue'),
      meta: { title: '首页 - 路易斯商城' }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue'),
      meta: { title: '登录 - 路易斯商城' }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ '@/views/login/Register.vue')
    },
    {
      path: '/goodsDetail/:id',
      name: 'GoodsDetail',
      component: () => import(/* webpackChunkName: "detail" */ '@/views/detail/Detail.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import(/* webpackChunkName: "cart" */ '@/views/cart/Cart.vue')
    },
    {
      path: '/myOrder',
      name: 'MyOrder',
      component: () => import(/* webpackChunkName: "myOrder" */ '@/views/myOrder/MyOrder.vue')
    },
    {
      path: '/pay',
      name: 'Pay',
      component: () => import(/* webpackChunkName: "pay" */ '@/views/pay/Pay.vue')
    }
  ]
})

// 定义所有需要权限访问的页面
const authUrls = ['/pay', '/cart', '/myOrder']
// 全局前置导航守卫 在访问页面前执行
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '路易斯商城'
  const token = localStorage.getItem('token')
  if (token) {
    next() // 已登录，允许访问所有路由
  } else {
    if (authUrls.includes(to.path)) {
      alert('请先登录')
      next({ path: '/login' }) // 未登录，且访问的是需要权限的路由，重定向到登录页面
    } else {
      next() // 未登录，但访问的路由不需要权限，允许访问
    }
  }
})

export default router
