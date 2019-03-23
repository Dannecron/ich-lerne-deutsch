import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/store';
import NotFound from '@/views/Errors/NotFound';
import Home from '@/views/Home';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
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
            component: () => import(/* webpackChunkName: "articles/article" */ '@/views/Article'),
        },
        {
            path: '/articles/:articleId/part/:partId',
            name: 'articlePart',
            props: true,
            component: () => import(/* webpackChunkName: "articles/article_part" */ '@/views/ArticlePart'),
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
            meta: { authRequired: true },
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
        },
    ],
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    Store.dispatch('initAuth')
        .then((user) => {
            if (to.matched.some(route => route.meta.authRequired)) {
                return user ? next() : next('/sign_in');
            }
        
            return next();
        })
})

export default router;
