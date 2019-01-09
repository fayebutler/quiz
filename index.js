var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('click', function(num) {
      console.log("chose ", num);
  })
});

nextApp.prepare().then(() => {
  // app.get('/messages', (req, res) => {
  //   res.json(messages)
  // })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  });

  http.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
});

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/templates/index.html');
// });
//
// app.get('/master', function(req, res){
//   res.sendFile(__dirname + '/templates/master.html');
// });
// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

