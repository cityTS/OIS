import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: require('@/views/LoginPage.vue').default,
      beforeEnter: (to, from, next) => {
        let cookie = document.cookie.split(';')[0]
        if (cookie.length === 0) next()
        else {
          next({path: '/'})
        }
      }
    },
    {
      path: '/',
      name: 'console-page',
      component: require('@/views/ConsolePage.vue').default,
      beforeEnter: (to, from, next) => {
        let cookie = document.cookie.split(';')[0]
        if (cookie.length === 0) next({path: '/login'})
        else {
          next()
        }
      }
    }
  ]
})
