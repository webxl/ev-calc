const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const server = express();

(function() {
  if (process.env.USE_WEBPACK) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config')();
    const compiler = webpack(webpackConfig);

    server.use(require("webpack-dev-middleware")(compiler, {
      logLevel: 'info', publicPath: webpackConfig.output.publicPath
    }));

    server.use(require("webpack-hot-middleware")(compiler));
  }
})();

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use('/lib', express.static(path.join(__dirname, 'node_modules')));
server.use('/dist', express.static(path.join(__dirname, 'dist')));
server.use('/', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.send(err.message)
});

const port = process.env.PORT || '3000';
server.set('port', port);
const httpServer = http.createServer(server);

httpServer.listen(port);
