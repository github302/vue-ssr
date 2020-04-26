import { createApp } from './app';

const { app, store, router} = createApp();
if (window.__INITIAL_STATE__) {
    console.log("client init_state");
    store.replaceState(window.__INITIAL_STATE__);
}
const designPages = ['/about'];

router.beforeEach((to, from ,next) => {
    console.log("client beforeEach", to.path);
    if (designPages.some((page) => page === to.path)) {
        window.isvScript="http://localhost:3000/static/js/goods-detail__v2.495932d1.js";
    }
    const matchedComponents = router.getMatchedComponents(to);
    Promise.all(matchedComponents.map((component) => {
        if (component.preFetch) {
            return component.preFetch({
                store,
                route: to.currentRoute,
            })
        }
    })).then(() => {
        next();
    }).catch((e) => {
        next();
    })
});

router.afterEach((route, from) => {
    console.log('client afterEach ', route.path);
})
app.$mount("#app");