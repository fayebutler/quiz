import React from 'react';
import { EVENTS } from '../constants';
import Button from '../components/button';

import styles from '../styles/styles.scss';

class Master extends React.Component {

    state = {
      started: false,
      finished: false,
      players: [],
      currentQuestion: 0,
      totalQuestions: null
    }

    componentDidMount() {
      this.props.socket.emit(EVENTS.MASTER_JOIN);
      this.props.socket.on(EVENTS.JOIN, (profile) => {
        console.log("someone joined ", profile);
      });
      this.props.socket.on(EVENTS.SELECT_ANSWER, (data) => {
          console.log("someone clicked ", data);
          // this.setState({
          //   players: data
          // });
      });
      this.props.socket.on(EVENTS.FINISH, (data) => {
          console.log("final players ", data);
          this.setState({
            finished: true,
            players: data
          });
      });
      this.props.socket.on(EVENTS.RESET, () => {
        this.setState({
          started: false,
          finished: false,
          players: []
        })
      });
      this.props.socket.on(EVENTS.MASTER_UPDATE, (data) => {
        this.setState({
          players: data['players'],
          currentQuestion: data['currentQuestion'],
          totalQuestions: data['totalQuestions']
        });
      });
    }

    start = (e) => {
        this.props.socket.emit(EVENTS.START);
        this.setState({
          started: true
        })
    };

    updateQuestion = (e) => {
        this.props.socket.emit(EVENTS.UPDATE_QUESTION);
    };

    reset = (e) => {
        this.props.socket.emit(EVENTS.RESET);
    };

    renderPlayers = () => {
      return this.state.players.sort(function (a, b) { return b.num_correct - a.num_correct;})
          .map((player) => {
              return <h3 key={player.name}>Player: {player.name}  Score: {player.num_correct}</h3>
          }
      );
    }

    renderNextButton = () => {
      let message = "";
      this.state.currentQuestion === (this.state.totalQuestions - 1) ? message = "Finish" : message = "Next Question"
      console.log("players ", this.state.players);
      console.log("current question ", this.state.currentQuestion);
      let disabled = false;
      this.state.players.map( (player) => {
        if (player.num_answered !== (this.state.currentQuestion + 1)) {
          disabled = true;
        }
      })
      return <Button handleClick={this.updateQuestion} id="next-q" message={message} disabled={disabled} />
    }

    render() {
      let message = "";
      this.state.currentQuestion === (this.state.totalQuestions - 1) ? message = "Finish" : message = "Next Question"
        return (
            <div className="content">
                <h1>Master</h1>
                { !this.state.finished ?
                    !this.state.started ?
                      <Button handleClick={this.start} id="start" message="Start" />
                      : this.renderNextButton()
                    : ''
                }
                <div className="players">
                  {this.renderPlayers()}
                </div>
                <Button handleClick={this.reset} id="reset" message="Reset" />
            </div>
        )
    }
}

export default Master
