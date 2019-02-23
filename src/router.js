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
      component: () => import(/* webpackChunkName: "articles/index" */ '@/views/Articles'),
    },
    {
      path: '/articles/:articleId',
      name: 'article',
      props: true,
      component: () => import(/* webpackChunkName: "articles/article" */ '@/views/Article')
    },
    {
      path: '/articles/:articleId/part/:partId',
      name: 'articlePart',
      props: true,
      component: () => import(/* webpackChunkName: "articles/article_part" */ '@/views/ArticlePart')
    },
    {
      path: '/words',
      name: 'words',
      component: () => import(/* webpackChunkName: "words" */ '@/views/Words'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "words" */ '@/views/Profile'),
      beforeEnter: AuthMiddleware,
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: () => import(/* webpackChunkName: "sign_in" */ '@/views/SignIn'),
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: () => import(/* webpackChunkName: "sign_up" */ '@/views/SignUp'),
    },
    {
      path: '*',
      component: NotFound,
    }
  ],
  mode: 'history',
});
