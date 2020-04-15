import { createApp } from './app';

const { app, store, router} = createApp();
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
router.beforeEach((to, from ,next) => {
    console.log("client beforeEach", to.path);
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