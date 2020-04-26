import Vue from 'vue';
import App from './App.vue';
import { loadScript } from './utils';

Vue.component('isv-comp', (resolve) => {
    if (window._global.isvScript) {
        loadScript(window._global.isvScript).then((comp) => {
            resolve(comp);
        })
    } else {
        resolve({
            render: h => h(
                'div'
            )
        })
    }
    
})
const vm = new Vue({
    render: h => h(App)
}).$mount("#app");