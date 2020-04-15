const { createRenderer } = require('vue-server-renderer');
const fs = require('fs');
const createApp = require('./src/app');

const renderer = createRenderer({
    template: fs.readFileSync('./src/index.template.html', 'utf-8'),
})
module.exports = async(req, res) => {
    const context = {
        url: req.url,
    }
    try{
        const app = createApp(context);
        const appHtml = await renderer.renderToString(app);
        res.end(appHtml);
    }catch(err) {
        res.status(500).end(err.message);
    }
}