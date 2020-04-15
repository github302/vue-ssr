import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';

Vue.use(Router);

export function createRouter() {
    const router = new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Home },
            { path: '/about', component: About }, 
        ]
    })
    return router;
}