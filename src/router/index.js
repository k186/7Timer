const home = resolve => require(['../pages/home.vue'], resolve)
const baidu = resolve => require(['../pages/baidu.vue'], resolve)
const google = resolve => require(['../pages/google.vue'], resolve)
const gaode = resolve => require(['../pages/gaode.vue'], resolve)

const Mapping = {
  routes () {
    return [
      {
        path: '/',
        name: 'Home',
        component: home
      },
      {
        path: '/baidu',
        name: 'baidu',
        component: baidu
      },
      {
        path: '/google',
        name: 'google',
        component: google
      },
      {
        path: '/gaode',
        name: 'gaode',
        component: gaode
      },
      {
        path: '*',
        name: 'rHome',
        redirect: '/'
      }
    ]
  }
}
export default Mapping
