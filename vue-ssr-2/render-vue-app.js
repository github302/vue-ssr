const Vue = require('vue');
const fs = require('fs');
const { createRenderer } = require('vue-server-renderer');
const renderer = createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8'),
})
module.exports = async(req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<p>The visited url is {{url}}</p>`,
    });

    try {
        const appHtml = await renderer.renderToString(app);
        res.end(appHtml);
    } catch(err) {
        res.status(500).end(err.message);
    }
}