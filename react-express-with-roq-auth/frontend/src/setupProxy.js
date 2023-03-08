const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
    app.use(proxy(`/api`, {target: 'http://localhost:3020', changeOrigin: true}));
};
