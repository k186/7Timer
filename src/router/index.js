const home = resolve => require(['../pages/home.vue'], resolve)

const Mapping = {
  routes () {
    return [
      {
        path: '/',
        name: 'Home',
        component: home
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
