// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuefire from 'vuefire';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import firebase from './services/firebase';


Vue.config.productionTip = false;
Vue.use(Vuefire);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    burgers: firebase.database.ref('burgers'),
  },
  router,
  template: '<App/>',
  components: { App },
});
