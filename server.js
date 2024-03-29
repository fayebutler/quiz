var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const questions = require('./questions.json');
const constants = require('./constants');

const QuizMaster = require('./quiz');

let quiz = new QuizMaster(questions);


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on(constants.EVENTS.JOIN, function(name) {
    console.log("player joined", name);
    socket.name = name;
    quiz.addPlayer(name);
    // io.to('master').emit(EVENTS.JOIN, {name: name});
    io.emit(constants.EVENTS.JOIN, quiz.players);
  });

  socket.on(constants.EVENTS.MASTER_JOIN, function() {
    // socket.join('master');
    socket.name = 'master';
  })

  socket.on(constants.EVENTS.SELECT_ANSWER, function(num) {
      quiz.updatePlayer(socket.name, num)
      // io.to('master').emit(EVENTS.SELECT_ANSWER, {'num': num, 'name': socket.name});
      io.emit(constants.EVENTS.SELECT_ANSWER, {'num': num, 'name': socket.name});
      io.emit(constants.EVENTS.MASTER_UPDATE, {'players': quiz.players, 'currentQuestion': quiz.currentQuestionNum, 'totalQuestions': quiz.numQuestions});
  });

  socket.on(constants.EVENTS.START, function(){
    let question = quiz.getCurrentQuestion();
    io.emit(constants.EVENTS.SEND_QUESTION, question);
    io.emit(constants.EVENTS.MASTER_UPDATE, {'players': quiz.players, 'currentQuestion': quiz.currentQuestionNum, 'totalQuestions': quiz.numQuestions});
  })

  socket.on(constants.EVENTS.RESET, function(){
    quiz.reset();
    io.emit(constants.EVENTS.RESET);
  })


  socket.on(constants.EVENTS.UPDATE_QUESTION, function() {
    let continuequiz = quiz.nextQuestion();
    if(continuequiz) {
      io.emit(constants.EVENTS.SEND_QUESTION, quiz.getCurrentQuestion());
      io.emit(constants.EVENTS.MASTER_UPDATE, {'players': quiz.players, 'currentQuestion': quiz.currentQuestionNum, 'totalQuestions': quiz.numQuestions});
    } else {
      io.emit(constants.EVENTS.FINISH, quiz.players);
      quiz.reset();
    }
  })
});

const PORT = process.env.PORT || 8080;

nextApp.prepare().then(() => {

    // app.get('/question/:id', (req, res) => {
    //     console.log("QUESTIONS ", req.params, req.query);
    //     const actualPage = '/question';
    //     const queryParams = { id: req.params.id };
    //     nextApp.render(req, res, actualPage, queryParams)
    // });
    //
    // app.get('/api/:id', (req, res) => {
    //     console.log("API ", req.params);
    //     const question = questions[req.params.id];
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify(question));
    // });

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    });

    http.listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
});
