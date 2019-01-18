
const SERVER_URL = 'https://quiz.fayebutler.com';
// const SERVER_URL = 'http://localhost:8080';

const EVENTS = {
    JOIN: 'join',
    SELECT_ANSWER: 'select_answer',
    START: 'start',
    MASTER_JOIN: 'master_join',
    MASTER_UPDATE: 'master_update',
    SEND_QUESTION: 'send_question',
    UPDATE_QUESTION: 'update_question',
    FINISH: "finish",
    RESET: "reset"
};

module.exports = {
  EVENTS: EVENTS,
  SERVER_URL: SERVER_URL
};
