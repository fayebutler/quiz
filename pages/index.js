import React from 'react';
import Login from '../components/login'
import Question from '../components/question'
import { EVENTS } from '../constants'

import styles from '../styles/styles.scss';


class Client extends React.Component {
    state = {
      name: null,
      question: null,
      loggedIn: false,
      answer: null,
      finished: false,
      score: null
    }

    componentDidMount() {

      this.props.socket.on(EVENTS.SEND_QUESTION, this.nextQuestion)
      this.props.socket.on(EVENTS.RESET, () => {
        this.setState({
          name: null,
          question: null,
          loggedIn: false,
          answer: null,
          finished: false,
          score: null
        })
      });
      this.props.socket.on(EVENTS.FINISH, (data) => {
          console.log("final players ", data);
          let myData = data.find(player => player['name'] === this.state.name);
          this.setState({
            question:null,
            answer:null,
            finished: true,
            score: myData
          })
      });
    }

    nextQuestion = (data) => {
      this.setState({
        question: data,
        answer: null
      });
    }

    handleLogin = (player) => {
      this.setState({
        name: player['name'],
        loggedIn: true
      });
    }

    buttonClick = (e, id) => {
        this.props.socket.emit(EVENTS.SELECT_ANSWER, id);
        this.setState({
          answer: id
        })
    };


    render() {
        return (
           <div className="content">
               { this.state.finished ?
                    <div>Score: {this.state.score.num_correct}</div>
                 : !this.state.loggedIn ?
                     <Login handleLogin={this.handleLogin} socket={this.props.socket}/>
                     : <Question data={this.state.question} buttonClick={this.buttonClick} answer={this.state.answer}/>
               }
           </div>
        );
    }
}

export default Client
