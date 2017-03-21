import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Mapping from './router'
import store from './store'
// import VueResource from 'vue-resource'

Vue.use(VueRouter)
// Vue.use(VueResource)

const router = new VueRouter({
  routes: Mapping.routes()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
