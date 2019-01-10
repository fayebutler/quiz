var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const questions = require('./questions.json');


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('click', function(num) {
      console.log("chose ", num);
      io.emit('click', num);
  });

  socket.on('start', function(){
    io.emit('question', questions[0]);
  })
});

nextApp.prepare().then(() => {

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  });

  http.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
});
