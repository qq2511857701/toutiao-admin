import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue' //'@/表示src
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // / 通常是网站的首页
    // 命名路由name: 'Layout', 有一个默认子路由 这个名字没有意义
    // 正确的做法是 如果有默认的子路由 就不要给父路由起名字了
    component: () => import('@/views/layout/index.vue'),
    children: [{
      path: '',//path为空的话就会默认子路由渲染
      name: 'Home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('@/views/practice/practice.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('@/views/article/article.vue')
    },

  ]
  },

]

const router = new VueRouter({
  routes
})
// 路由导航守卫说白了所有页面导航都会经过这里
// to 要去的路由信息
// from  来自哪里的路由信息
// next 放行的方法
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
// 判断如果访问页面的不是/login 校验他的登录状态
// 如果没有登录,则跳转到的是登陆页面
// 如果登陆了则 允许通过
  if (to.path !== '/login') {
    if(user) {
          // 已經登錄
          next()
    }else{
      // 登陆页面正常放行
      next('/login')
    }
  }else {
    next()
  }
})

export default router