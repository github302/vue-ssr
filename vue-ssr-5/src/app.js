import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';

export function createApp(context) {
    const store = createStore();
    const router = createRouter();

    const app = new Vue({
        store,
        router,
        render: h => h(App),
    })
    return { store, router, app };
}