const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const server = express();
const template = fs.readFileSync('./src/index.template.html', 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});

server.set('view engine', 'html');
server.engine('html', ejs.renderFile);

server.use('/dist', express.static('./dist'));
server.use('/public', express.static('/public'));
const designPages = ['/about'];
async function renderVueApp(req, res) {
    const context = { url: req.url };

    try{    
        if (designPages.some((page) => page === req.url)) {
            res.render(path.join(__dirname, './dist/index.html'), { data: JSON.stringify({ name:'xiaoshuai', isvScript: 'http://localhost:3000/static/js/goods-detail__v2.495932d1.js'}) });
        } else {
            let appHtml = await renderer.renderToString(context);
            console.log('renderVueApp:', req.url);
            // 替换成另一个html，且这个html加载一个新的app对象，用于挂载第三方组件
            res.end(appHtml);
        }
        
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

server.get('/ejs', (req, res) => {
    res.render(path.join(__dirname, './isv/index.template.html'), { data: JSON.stringify({ name:'xiaoshuai'}) });
})

server.get('/isv', (req, res) => {
    res.render(path.join(__dirname, './dist/index.html'), { data: JSON.stringify({ name:'xiaoshuai', isvScript: 'http://localhost:3000/static/js/goods-detail__v2.495932d1.js'}) });
})
server.get('*', renderVueApp);

server.listen(3001, (req, res) => {
    console.log('Server is listening on http://localhost:3001');
})