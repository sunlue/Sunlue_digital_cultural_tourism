// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/public.css'
import config from './config'
import myfunction from './assets/js/public'
import 'animate.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.prototype.$config = config
Vue.prototype.$myfunction = myfunction


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: {index},
  template: '<index/>',
})
