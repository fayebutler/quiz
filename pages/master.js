import React from 'react';
import { EVENTS } from '../constants';
import Button from '../components/button';

import styles from '../styles/styles.scss';

class Master extends React.Component {

  state = {
    started: false,
    finished: false,
    players: null
  }

    constructor(props) {
        super(props);
        this.props.socket.emit(EVENTS.MASTER_JOIN);
        this.props.socket.on(EVENTS.JOIN, (profile) => {
          console.log("someone joined ", profile);
        });
        this.props.socket.on(EVENTS.SELECT_ANSWER, (data) => {
            console.log("someone clicked ", data);
        });
        this.props.socket.on(EVENTS.FINISH, (data) => {
            console.log("final players ", data);
            this.setState({
              finished: true,
              players: data
            })
        });
        this.props.socket.on(EVENTS.RESET, () => {
          this.setState({
            started: false,
            finished: false,
            players: null
          })
        })
    }

    start = (e) => {
        this.props.socket.emit(EVENTS.START);
        console.log(e.target);
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
              return <p>Player: {player.name}  Score: {player.num_correct}</p>
          }
      );
    }

    render() {
        return (
            <div className="content">
                <h1>Master</h1>
                { !this.state.started ?
                  <Button onClick={this.start} id="start" message="Start" />
                  : <Button onClick={this.updateQuestion} id="next-q" message="Next Question" />
                }
                <Button onClick={this.reset} id="reset" message="Reset" />
                { this.state.finished ?
                    this.renderPlayers()
                    : ''
                }
            </div>
        )
    }
}

export default Master
