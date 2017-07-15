var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var modRewrite = require('connect-modrewrite');

var app = connect();
app.use(modRewrite([
  '^/$ /index.html [L]',
  '^(.+\\..*)$ /$1 [L]',
  '^/(.+)$ /index.html [L]',
  '.* [F]'
]));
app.use(serveStatic('./public'));
http.createServer(app).listen(3000);