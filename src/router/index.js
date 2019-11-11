import Vue from 'vue';
import VueRouter from 'vue-router';

import Root from '@/views/root';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'root',
    component: Root
  }
];

const router = new VueRouter({
  routes
});

export default router;
