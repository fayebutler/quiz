
const questions = require('./questions.json');

class QuizMaster {
    constructor(questions) {
        this.currentQuestionNum = 0;
        this.players = [];
        this.questions = questions;
        this.numQuestions = questions.length;
    }

    addPlayer(name) {
      console.log('add player');
      let player = {
        'name': name,
        'num_correct': 0,
        'num_answered': 0
      };
      this.players.push(player);
    }

    updatePlayer(name, choice) {
      let player = this.players.find(player => player.name === name);
      player.num_answered++;
      let correct = this.checkAnswer(choice);
      if(correct) {
        player.num_correct++;
      };
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionNum];
    }

    nextQuestion() {
        this.currentQuestionNum ++;
        console.log("length ", this.questions.length);
        console.log(this.currentQuestionNum > this.questions.length - 1)
        if(this.currentQuestionNum > this.questions.length - 1) {
            console.log("END");
            return false;
        }
        return true;
    }

    checkAnswer(ansId) {
        let question = this.questions[this.currentQuestionNum];
        console.log("Questions ", this.questions);
        console.log("current question ", this.currentQuestionNum);
        console.log("in check answer ", question);
        return question['correct'] === ansId;
    }

    reset() {
      //reset
      this.currentQuestionNum = 0;
      this.players = [];
    }
}


module.exports = QuizMaster;
