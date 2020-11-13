import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }, {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }
    ]
  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }, {
    path: '/article/:articleID',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  }, {
    path: '/userprofile',
    name: 'userprofile',
    component: () => import('@/views/userProfile')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (from.path === '/my') {
    store.state.routerBackFlag = true
  }
  next()
})
export default router
