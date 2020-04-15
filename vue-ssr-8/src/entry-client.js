import { createApp } from './app';

const { app, store, router} = createApp();
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
const designPages = ['/about'];

function loadScript() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                console.log("script 加载完成");
                console.log(window.mallCloud);
                resolve();
                script.onload = script.onreadystatechange = null;
            }
        };
        script.setAttribute('src', 'http://localhost:3000/static/js/goods-detail__v2.495932d1.js');
        document.body.appendChild(script);
    })
}

function loadIsv(to) {
    if (designPages.some((page) => page === to.path) && !window.mallCloud) {
        return loadScript();
    }
    return Promise.resolve();  
}

router.beforeEach((to, from ,next) => {
    console.log("client beforeEach", to.path);

    loadIsv(to).then(() => {
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
})
app.$mount("#app");