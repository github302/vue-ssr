const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const fs = require('fs');

const server = express();
const template = fs.readFileSync('./src/index.template.html', 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});

server.use('/dist', express.static('./dist'));
server.use('/public', express.static('/public'));

async function renderVueApp(req, res) {
    const context = { url: req.url };

    try{    
        const appHtml = await renderer.renderToString(context);
        res.end(appHtml);
    }catch(err) {
        if (err.url) {
            res.redirect(res.url);
        } else if (err.code == 404) {
            res.status(404).end('Page Not Found');
        } else {
            res.status(500).end(err.message);
        }
    }
}

server.get('*', renderVueApp);

server.listen(3000, (req, res) => {
    console.log('Server is listening on http://localhost:3000');
})