
const SERVER_URL = 'http://localhost:3000';

const EVENTS = {
    JOIN: 'join',
    SELECT_ANSWER: 'select_answer',
    START: 'start',
    MASTER_JOIN: 'master_join',
    SEND_QUESTION: 'send_question',
    UPDATE_QUESTION: 'update_question',
    FINISH: "finish",
    RESET: "reset"
};

module.exports = {
  EVENTS: EVENTS,
  SERVER_URL: SERVER_URL
};
