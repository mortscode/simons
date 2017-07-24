import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import BurgerList from '@/components/BurgerList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/burgers',
      name: 'burgers',
      component: BurgerList,
    },
  ],
});
