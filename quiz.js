
const questions = require('./questions.json');

class Quiz {
    constructor() {
        this.currentQuestionNum = 0;
        this.players = []
    }
    addPlayer() {

    }
    getCurrentQuestion() {
        return questions[currentQuestionNum];
    }

    nextQuestion() {
        currentQuestionNum ++;
        if(currentQuestionNum > questions.length - 1) {
            console.log("END");
            return false;
        }
    }

    checkAnswer(ansId) {
        let question = questions[currentQuestionNum];
        return question['correct'] === ansId;
    }
}
