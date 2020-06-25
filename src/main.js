import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Router from 'vue-router';
import App from './App.vue';
import List from './components/List.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const socket = io('http://localhost:5000');

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false;

const routes = [
  { path: '', component: List },
];

const router = new Router({
  mode: 'history',
  routes, // short for `routes: routes`
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
