const Vue = require('vue');

module.exports = function(context) {
    const app = new Vue({
        data: {
            url: context.url,
        },
        template: `
        <div>
            <p>Hello World, The Visited URL is {{url}}</p>
            <button @click="sayHello">Hello</button>
        </div>`,
        methods: {
            sayHello() {
                window.alert('Hello!');
            }
        }
    });
    return app;
}