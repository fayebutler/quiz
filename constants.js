
const SERVER_URL = 'http://localhost:3000';

const EVENTS = {
    JOIN: 'join',
    SELECT_ANSWER: 'select_answer',
    START: 'start',
    MASTER_JOIN: 'master_join',
    NEXT_QUESTION: 'next_question'
};

module.exports = {
  EVENTS: EVENTS,
  SERVER_URL: SERVER_URL
};
