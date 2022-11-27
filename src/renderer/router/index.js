import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: require('@/views/LoginPage.vue').default,
      beforeEnter: (to, from, next) => {
        if (store.state.Token.name === undefined) next()
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
        if (store.state.Token.name === undefined) {
          next({path: '/login'})
        }
        next()
      }
    }
  ]
})
