import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '@/components/App'

Vue.use(VueRouter)

var routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
        return {selector: to.hash}
    } else {
        return { x: 0, y: 0 }
    }
  },
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
