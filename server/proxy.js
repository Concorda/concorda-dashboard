var url = require('url');

module.exports = function(server) {
  server.register(require('h2o2'), function(err) {
    if (err) { throw err; }

    console.log('Proxy all /api & /auth to ', process.env.PROXY_HOST + ':' + process.env.PROXY_PORT)

    server.route({
      method: '*',
      path: '/api/{path*}',
      handler: {
        proxy: {
          passThrough: true,
          redirects: 5,
          mapUri: function(req, cb) {
            var uri = {
              protocol: 'http',
              hostname: process.env.PROXY_HOST,
              port: process.env.PROXY_PORT,
              pathname: req.params.path
            };
            cb(null, url.format(uri));
          }
        }
      }
    });

    server.route({
      method: '*',
      path: '/auth/{path*}',
      handler: {
        proxy: {
          passThrough: true,
          redirects: 5,
          mapUri: function(req, cb) {
            var uri = {
              protocol: 'http',
              hostname: process.env.PROXY_HOST,
              port: process.env.PROXY_PORT,
              pathname: req.params.path
            };
            cb(null, url.format(uri));
          }
        }
      }
    });
  });
}