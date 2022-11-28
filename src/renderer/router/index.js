import Vue from 'vue'
import Router from 'vue-router'
const storage = require('electron-localstorage')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: require('@/views/LoginPage.vue').default,
      beforeEnter: (to, from, next) => {
        if (storage.getItem('name') === '' || storage.getItem('name') === null) next()
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
        if (storage.getItem('name') === '' || storage.getItem('name') === null) {
          next({path: '/login'})
        }
        next()
      }
    }
  ]
})
