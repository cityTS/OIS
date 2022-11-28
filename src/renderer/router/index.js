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
        console.log(localStorage.getItem('name'))
        console.log(typeof (localStorage.getItem('name')))
        if (localStorage.getItem('name') === 'null' || localStorage.getItem('name') === null) next()
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
        if (localStorage.getItem('name') === 'null' || localStorage.getItem('name') === null) {
          next({path: '/login'})
        }
        next()
      }
    }
  ]
})
