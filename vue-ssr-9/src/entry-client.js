import { createApp } from './app';

const { app, store, router} = createApp();
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
const designPages = ['/about'];

function loadScript(scriptSrc) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                console.log("client script 加载完成");
                resolve();
                script.onload = script.onreadystatechange = null;
            }
        };
        script.setAttribute('src', scriptSrc);
        document.body.appendChild(script);
    })
}

function loadIsvScript(to) {
    if (designPages.some((page) => page === to.path) && !window.mallCloud) {
        return loadScript('http://localhost:3001/api/init.jsonp?callback=initGlobal');
    }
    return Promise.resolve();  
}

router.beforeEach((to, from ,next) => {
    console.log("client beforeEach", to.path);
    loadIsvScript(to);
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