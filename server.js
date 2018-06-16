var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

let MSGS = [
  {
    msg: 'test',
    votes: 2
  }, 
  {
    msg: 'help',
    votes: 4
  }
  ];

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});


io.on('connection', function(socket) {
  console.log('client connected!');

  socket.on('join', function(data) {
    console.log(data);
  });

  // socket.emit('msgs', {msgs: MSGS});

  // socket.on('send-msg', (msg) => {
  //   console.log('msg received')
  //   MSGS.push(msg);
  //   MSGS.sort((a, b) => {
  //     return b.votes - a.votes;
  //   })
  //   io.emit('msgs', {msgs: MSGS});
  // });
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});
