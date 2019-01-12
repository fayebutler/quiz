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

      this.props.socket.on(EVENTS.NEXT_QUESTION, this.nextQuestion)
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

    render() {
        return (
           <div>
              { !this.state.loggedIn ?
                  <Login handleLogin={this.handleLogin} socket={this.props.socket}/>
                  : <Question data={this.state.question} socket={this.props.socket}/>
               }
           </div>
        );
    }
}

export default Client
