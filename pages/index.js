import React from 'react';
import Login from '../components/login'
import Question from '../components/question'
import { EVENTS } from '../constants'

import styles from '../styles/styles.scss';


class Client extends React.Component {
    state = {
      name: null,
      question: null,
      loggedIn: false
    }

    componentDidMount() {

      this.props.socket.on(EVENTS.SEND_QUESTION, this.nextQuestion)
      this.props.socket.on(EVENTS.RESET, () => {
        this.setState({
          name: null,
          question: null,
          loggedIn: false
        })
      })
    }

    nextQuestion = (data) => {
      this.setState({question: data});
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
          question: null
        })
    };


    render() {
        return (
           <div className="content">
              { !this.state.loggedIn ?
                  <Login handleLogin={this.handleLogin} socket={this.props.socket}/>
                  : <Question data={this.state.question} buttonClick={this.buttonClick}/>
               }
           </div>
        );
    }
}

export default Client
