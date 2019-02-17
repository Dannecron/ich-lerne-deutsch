import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/store';
import NotFound from '@/views/Errors/NotFound';
import Home from '@/views/Home';

Vue.use(Router);

function AuthMiddleware(from, to, next) {
  if (Store.getters.isUserAuthentificated) {
    next();
  } else {
    next('/sign_in');
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import(/* webpackChunkName: "articles" */ '@/views/Articles.vue'),
    },
    {
      path: '/words',
      name: 'words',
      component: () => import(/* webpackChunkName: "words" */ '@/views/Words.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "words" */ '@/views/Profile.vue'),
      beforeEnter: AuthMiddleware,
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: () => import(/* webpackChunkName: "sign_in" */ '@/views/SignIn.vue'),
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: () => import(/* webpackChunkName: "sign_up" */ '@/views/SignUp.vue'),
    },
    {
      path: '*',
      component: NotFound,
    }
  ],
  mode: 'history',
});
