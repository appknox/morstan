import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Notifications from 'vue-notification';
import './registerServiceWorker';

Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
