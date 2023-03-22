const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
    app.use(proxy(process.env.REACT_APP_SERVER_API_ENDPOINT, {
        target: process.env.REACT_APP_SERVER_URL,
        changeOrigin: true
    }));
};
