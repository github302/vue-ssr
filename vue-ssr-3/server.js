const express = require('express');
const server = express();
const renderVueApp = require('./render-vue-app');

server.get('*', renderVueApp);

server.listen(3000, (req, res) => {
    console.log('Server is listening on http://localhost:3000');
})